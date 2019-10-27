// include ESP8266Wifi library
#include <ESP8266WiFi.h>
#include <ESP8266WiFiAP.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WiFiScan.h>
#include <ESP8266WiFiSTA.h>
#include <ESP8266WiFiType.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>
#include <WiFiServer.h>
#include <WiFiServerSecure.h>
#include <WiFiUdp.h>

// include aREST library
#include <aREST.h>

// include I2C communication
#include <Wire.h>

// define a LISTEN_PORT for wifi
// this is a port for listening for incoming TCP connections
#define LISTEN_PORT 80

// define LED pin to view the processing of wifi connection instead of Serial
#define LED D7

// create aREST instance
aREST rest = aREST();

// Wifi parameters including name and password
const char * ssid = "wifiname";
const char * password = "wifipassword";

// array of chars, which is the data to transmit to the slave(Leonardo)
char str[50];

// Create an instance of server
WiFiServer server(LISTEN_PORT);

void setup() {
  // put your setup code here, to run once:

  pinMode(LED, OUTPUT);

  // Start a serial
  Serial.begin(9600);

  // begin the I2C communication base on 2 pins, D1 and D2 on nodeMCU
  Wire.begin(D1, D2);

  rest.function("keyboard", ledControl);
  // give a name and ID to device
  rest.set_id("9auct78");
  rest.set_name("nodeMCUv1.0");

  // Connect to the Wifi
  WiFi.begin(ssid, password);

  // Instead of using Serial, we turn on the LED when nodeMCU attempt to connect Wifi
  while (WiFi.status() != WL_CONNECTED)
  {
    digitalWrite(LED, HIGH);
    delay(1000);
    Serial.print(".");
  }

  // If wifi has been connected successfully, turn off the LED
  digitalWrite(LED, LOW);
  Serial.println("");
  Serial.println("Wifi connected");

  // Start the server
  server.begin();
  Serial.println("Server started");

  // Print the IP address
  Serial.println(WiFi.localIP());
}

void loop() {
  // put your main code here, to run repeatedly:

  // Handle REST calls
  WiFiClient client = server.available();
  if (!client)
  {
    return;
  }
  while (!client.available())
  {
    delay(1);
  }
  rest.handle(client);
}

/*
*   This function is called, when the command was sent from webapp with url
*   192.168.1.xxx?keyboard?params=command
*
*   This function receives a String object name `command`, then convert it into array of char
*   Next, transmit that array of char to the slave, and empty the array of char after transmitting
*
*   Explanation why we have to convert String -> array of char
*   `Wire.write(data)` function(the function to transmit data)
*   only takes array of char as parameter
*/
int ledControl(String command)
{
  String2ArrChar(command);
  TransmitData(str);
  EmptyStr(command);
  return 0;
}

/*
*   This function receives a String object(`str_input`) then copy all its character
*   to the `str`(array of char)
*/
void String2ArrChar(String str_input)
{
  /*
  *   The String object may contains a lot of characters,
  *   but we just copy maximum 49 characters of it
  *   In most test case, the number of characters in the String object has never exceeded 49 chars
  */

  // this is called safecopy in C from the perception of Zedd A.Shaw
  int len = str_input.length();
  int max_len = len > 49 ? 49 : len;
  int i = 0;
  for (i = 0; i < max_len; i++)
  {
    str[i] = str_input[i];
  }

  /*
  *   Every string(in form of array of chars) should be given '\0' to indicate the end of it
  */
  str[max_len + 1] = '\0';
}

/*
*   This function receives an array of chars then trasmit it to the slave at address 8(Leonardo)
*   
*   The main reason we use global `char str[50]` instead of pointer 
*   that could be returned from safecopy is becase it is easier.
*
*   For the pointer part, we have to handle NULL pointer
*/
void TransmitData(char string[])
{
  Wire.beginTransmission(8);
  Wire.write(string);
  Wire.endTransmission();
}

/*
*   After transmitting data successfully, we should empty the array of char
*   to prevent the following bugs.
*
*   First data: HelloWorld
*   If no empty takes place, second data: HiThere
*   Would result into this: HiThererld
*
*   The easiest way to empty the array of char(which I use here) is to replace every char with space(' ')
*   In addition, so as not to replace unnecessary characters
*   this function receives the String object for the its length to replace characters
*/
void EmptyStr(String str_input)
{
  int len = str_input.length();
  int max_len = len > 49 ? 49 : len;
  int i = 0;
  for (i = 0; i < max_len; i++)
  {
    str[i] = ' ';
  }
  str[max_len + 1] = '\0';
}

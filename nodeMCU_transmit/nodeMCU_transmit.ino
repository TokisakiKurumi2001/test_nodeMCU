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

// create aREST instance
aREST rest = aREST();

// Wifi parameters including name and password
const char * ssid = "lai khoi";
const char * password = "09012001";

char str[50];

// Create an instance of server
WiFiServer server(LISTEN_PORT);

void setup() {
  // put your setup code here, to run once:

  // Start a serial
  Serial.begin(9600);

  Wire.begin(D1, D2);

  rest.function("keyboard", ledControl);
  // give a name and ID to device
  rest.set_id("9auct78");
  rest.set_name("nodeMCUv1.0");

  // Connect to the Wifi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
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

int ledControl(String command)
{
  String2ArrChar(command);
  transmitData(str);
  EmptyStr(command);
  return 0;
}

void String2ArrChar(String str_input)
{
  int len = str_input.length();
  int max_len = len > 49 ? 49 : len;
  int i = 0;
  for (i = 0; i < max_len; i++)
  {
    str[i] = str_input[i];
  }
  str[max_len + 1] = '\0';
}

void transmitData(char string[])
{
  Wire.beginTransmission(8);
  Wire.write(string);
  Wire.endTransmission();
}

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

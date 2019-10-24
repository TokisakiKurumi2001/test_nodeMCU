// library to I2C communication and simulate the keyboard, mouse
/*
*	At first, it supposed to be:
*	#include <Keyboard.h>
*	#include <Mouse.h>
*
*	But there seems to have conflict between those 2 libraries
*	Therefore, we use double-quote("") instead of greater-less symbol(<>)
*/
#include <Wire.h>
#include "Keyboard.h"
#include "Mouse.h"

// a char for reading the data from the master
/*
*	Everytime the master(nodeMCU) transmits data, we could only read 1 character at a time
*/
char read_byte;

void setup() {
  // put your setup code here, to run once:

  // the address of this slave(Leonardo) is 8
  // on the master, Wire.beginTransmission(8) -> same address in order to transmit data to correct slave
  Wire.begin(8);

  // when receive data, do the `receiveEvent` function
  Wire.onReceive(receiveEvent);

  // ready to simulate the keyboard
  Keyboard.begin();

  // ready to simulate the mouse
  Mouse.begin();
}

void loop() {
  // put your main code here, to run repeatedly:

  // the `onReceive` will run continuously, so that we just put some delays in the loop for typing the keyboard
  delay(200);
}

/*
*	This function receive a character, then move the mouse base on some rules
*	Rules:
*	char == 
*		| u -> goes up
*		| d -> goes down
*		| l -> goes to the left
*		| r -> goes to the right
*		| t -> scroll up
*		| b -> scroll down
*/
void mouseControl(char command)
{
  // random the amount of pixels that the mouse will scroll/move	
  // if we eliminate this random number, there will be some pixels on the screen which we can't go to
  int random_dist = random(5, 10);
  switch (command)
  {
    case 'u':
	  // Mouse.move(distance_on_x_axis, distance_on_y_axis, number_of_scrolling_wheel);
	  // the coordinate of the screen be like
	  /*
	  *		0----->x
	  *		|
	  *		|
	  *		V y
	  */
      Mouse.move(0, (-1) * random_dist, 0);
      break;
    case 'd':
      Mouse.move(0, random_dist, 0);
      break;
    case 'l':
      Mouse.move((-1) * random_dist, 0, 0);
      break;
    case 'r':
      Mouse.move(random_dist, 0, 0);
      break;
    case 't':
      Mouse.move(0, 0, random_dist);
      break;
    case 'b':
      Mouse.move(0, 0, (-1) * random_dist);
      break;
    default: // alert error
	  // at this time, we will assume that there won't be any weird character receive from the webapp
	  // However, if there is any potential errors to be appear, here is the way to fix
	  /*
	  *		Attach the any pin to the LED(we will assume it is 8)
	  *		void setup() { .... pinMode(8, OUTPUT) }
	  *		void mouseControl(char command) { ... default: digitalWrite(8, HIGH); }
	  */
      break;
  }
}

/*
*	This function is called when this slave(Leonardo) receives any data from master(nodeMCU)
*	This function receives 1 parameter that is `the_len`(int) indicates for the number of data
*	This function bases on the rules, decide to move mouse or type the keyboard
*	Rules:
*	1. First character when receiving is '$' -> indicates to control mouse
*	   Second character following will indicates which movement to take to control the mouse
*	   It will be pass to the `mouseControl` function
*
*	2. First character when receiving is not '$' -> type on the keyboard every char we receive
*/
void receiveEvent(int the_len)
{
  // if we receive the data
  while (Wire.available())
  {
    // read the data char by char then assign it the char `read_byte`
    read_byte = Wire.read();

    if (read_byte == '$') {
      // read the next byte
      read_byte = Wire.read();
      mouseControl(read_byte);
    } else {
      Keyboard.print(read_byte);
    }
  }
  delay(10);
}

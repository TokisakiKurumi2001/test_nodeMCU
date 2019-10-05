// library to I2C communication and simulate the keyboard
#include <Wire.h>
#include <Mouse.h>
#include <Keyboard.h>

// a char for reading the data from the master
char read_byte;

void setup() {
  // put your setup code here, to run once:

  // slave at address `2`, have the same number in `Wire.beginTransmission(2);` in master
  Wire.begin(8);
  // when receive data, do the `receiveEvent` function
  Wire.onReceive(receiveEvent);

  // debugging
  // Serial.begin(9600);

  // ready to simulate the mouse
  Mouse.begin();

  // ready to simulate the keyboard
  Keyboard.begin();

  randomSeed(analogRead(0));
}

void loop() {
  // put your main code here, to run repeatedly:

  // the `onReceive` will run continuously, so that we just put some delays in the loop for typing the keyboard
  delay(200);
}

void mouse_control(char command)
{
  int random_dist = random(5, 15);
  switch (command)
  {
    case 'u':
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
      break;
  }
}

void receiveEvent(int the_len)
{
  // if we receive the data
  while (Wire.available())
  {
    // read the data char by char then assign it the char `read_byte`
    read_byte = Wire.read();
    // write the char to the screen
    if (read_byte == '$') {
      // read the next byte
      read_byte = Wire.read();
      mouse_control(read_byte);
    } else {
      Keyboard.print(read_byte);
    }
  }
  // after we have finished reading the whole data, press Enter to enter the new line
  // Keyboard.press(KEY_RETURN);
  // wait for `Enter` key is actually pressed
  delay(10);
  // releaseAll the keys that we are pressing
  // Keyboard.releaseAll();
}

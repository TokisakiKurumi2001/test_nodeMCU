# This is the repository for the wireless keyboard and mouse stimulator

## Why I do this project ?

My father bought a cool device to make our TV smarter, it now can surf the web, go to youtube.

However, the device just has 1 USB port only. I can't connect keyboard and mouse at the same time to the box.

As usual, we use the remote control to move the mouse when surfing the web. When typing(searching on youtube), there will a virtual keyboard, and we need to use the remote to go the right letter by pressing many up, down, right, left arrow on the remote.

This is quite tedious. In addition, I cannot surf when browsing the Internet. Because there seems to be no way to surf.

## My solution

Use Leonardo(or Pro Micro) to stimulate the keyboard and mouse.

Use nodeMCU to receive command from phone to transmit data to Leonardo and control mouse, type keyboard.

Two board was connected like the diagram below to communicate by I2C protocol.

[Picture_here]

## Feature

Instead of chosing every letter like before, the webapp is integrated with speech recognition(support 2 languages is Vietnamese and English) to search the content for you.

For control the mouse, I draw two circle with 6 buttons for up, down, left, right moving for the mouse; scroll up, scroll down to scroll the webpage.

## BUGZZ

There is some big bugs here:

1. Every button or links will open a new page on the browser:

I use aREST for establishing wireless control. But to host my UI design, which is the web page. It would require a local server since it takes too long to(sometimes cannot) connect to the aREST cloud service provided.

My solution at this time is this repository. It will host the web page for me. And when I want to give command, it will open the new page to transmit command.

I once use AJAXQ for sending message to the nodeMCU ip address. However, it seems not working at any time.

2. nodeMCU takes it too long to connect to the wifi hospot:

It seems like nodeMCU encounters hidden problem when connecting the wifi hospot.

My attempt to solve this is to log out every wifi that nodeMCU can scan for and connect to one of those. Hope to find a way here.
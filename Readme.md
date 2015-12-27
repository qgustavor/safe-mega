# Safe MEGA

A static web application which add passwords to folder links.

## How it works:

* File links are based in two parts, an handler and an HMAC key merged to a encryption key;
* Because the HMAC file links can't be controlled by the user;
* In the other hand folder links are based in two parts, an handler and the encryption key;
* As there isn't an HMAC key in folder links the user can use any encryption key possible.
* Finally this application generate an encryption key based in a password and the file handler;

## Some questions that still need to be resolved:

* How to make easier to the generated encryption key be used when sharing MEGA folder?
* How to prevent generated encryption key being leaked (to location.hash, browser history and other locations)?

**Fell free to open issues, fork and pull requests!**

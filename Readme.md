# Safe MEGA

A static web application which add passwords to folder links.

~~[Example folder](https://safeme.ga/#tIAGnDCY) (the password is [her name](http://myanimelist.net/character/7373) lowercased).~~

*Problem:* seems that MEGA did some changes in their servers making harder to put passwords
in folders with this tool. Old folders with passwords stopped working. I think the reason
for that is because they want this feature to be a PRO-only feature.

I don't like a fundamental security feature being paid if it only requires changes in
the client, so I will release a new version of Safe MEGA that solves this problem.
[For more information check the issue](https://github.com/qgustavor/safe-mega/issues/3).

## How it works:

* File links are based in two parts, an handler and an HMAC key merged to a encryption key;
* Because the HMAC file links can't be controlled by the user;
* In the other hand folder links are based in two parts, an handler and the encryption key;
* As there isn't an HMAC key in folder links the user can use any encryption key possible.
* Finally this application generate an encryption key based in a password and the file handler;

## Some questions that still need to be resolved:

* ~~How to make easier to the generated encryption key be used when sharing MEGA folder?~~
* How to prevent generated encryption key being leaked (to location.hash, browser history and other locations)?

**Fell free to open issues, fork and pull requests!**

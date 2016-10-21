# Safe MEGA

A static web application which add passwords to folder links.

[Example folder](https://safeme.ga/#9EUmiIab) (the password is [her name](http://myanimelist.net/character/7373) lowercased).

Generate keys for MEGA keys using PBKDF2 then share the folder handler by a non secure channel
and the password by a secure channel without having problems with hard to type keys.

Changelog:

* V1.0 (or "no version"): used to require changing the folder key, which isn't allowed
anymore by MEGA servers. Folders protected by this version stopped working.
* V2.0: now the folder key is pre-generated, so changing isn't needed. Also dropped
support for "extra-safe version", which turned to be not safe as expected.

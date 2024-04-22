# CLI-PASS

A command line password manager written in typescript.

## Installation

CLI-PASS requires [NodeJS](https://nodejs.org/en) to run.
From the root of the project install dependencies

```bash
npm i
```
start the program

```bash
npm start
```

## Warning

This is a hobby project, do not use for cruical data. The program uses KDF encryption to store and retrieve saved passwords
securely. With the current set up, the user's master password is not stored in the database. If you lose your password, you will
not be able to access the data, you cannot reset your master password, so that will be that.

## Platform Compatibility

The only OS specific issue I've run into so far relates to copying to the clipboard. On Mac there should be no problems. On Linux
you'll get an error if you're missing the required package but the error states how to fix and install. I've never tested the app 
on Windows. If you do let me know.


## Feature list

- Search by name or by first letter
- Quick and easy copy to clipboard functionality
- All Passwords encrypted before being stored in the database
- Create and store saved email addresses for quick access when creating new passwords
- Update passwords at any time

### WIP Features

- update email for existing saved passwords 
- master password reset


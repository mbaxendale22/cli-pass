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

## Feature list

- Search by name or by first letter
- Quick and easy copy to clipboard functionality
- All Passwords encrypted before being stored in the database
- Create and store saved email addresses for quick access when creating new passwords
- Update passwords at any time

### WIP Features
- manually enter new password (primarly for transfering passwords over) 
- update email for existing saved passwords 
- master password reset

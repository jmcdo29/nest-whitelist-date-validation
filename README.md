# nest-whitelist-date-validation

## Current Behavior

This was something interesting brought up in a [Discord message](https://discord.com/channels/520622812742811698/1166307455081381998/1166307455081381998).

When using the `ValidaitonPipe`, with `transform: false` **and** _defining_ `whitelist: false` (or any other variant of) along with `@Query('date') date: Date`, when accessing `date` in the route handler, it would come back as a `Date` object, rather than the expected `string`. When removing the `whitelist` option altogether, the `date` variable was correctly a `string`.

## Steps to reproduce

1. `pnpm i` (or whatever package manager you want
2. `pnpm start:dev`
3. `curl http://localhost:3000?date=2023-10-24T:10:00:00`
   a. alternatively, run `pnpm test:e2e`
4. Notice the logs
   a. or test failures

## Expected Behavior

I _believe_ that we don't want to run validations on `Date` class properties if they're single values, like when accessed via `@Query('date')`, `@Param('date')`, `@Body('date')`, etc. The fix for this is to simply add `Date`to the`toValidate` array of class types that we don't immediately run validations for.

### Package Info

```
 _   _             _      ___  _____  _____  _     _____
| \ | |           | |    |_  |/  ___|/  __ \| |   |_   _|
|  \| |  ___  ___ | |_     | |\ `--. | /  \/| |     | |
| . ` | / _ \/ __|| __|    | | `--. \| |    | |     | |
| |\  ||  __/\__ \| |_ /\__/ //\__/ /| \__/\| |_____| |_
\_| \_/ \___||___/ \__|\____/ \____/  \____/\_____/\___/


[System Information]
OS Version     : Linux 6.5
NodeJS Version : v20.8.0
PNPM Version    : 8.7.1

[Nest CLI]
Nest CLI Version : 10.2.0

[Nest Platform Information]
platform-express version : 10.2.7
schematics version       : 10.0.2
testing version          : 10.2.7
common version           : 10.2.7
core version             : 10.2.7
cli version              : 10.2.0
```

# koa-boilerplate
Based on [koajs](https://koajs.com/), [bookshelf](http://bookshelfjs.org/) and [knex](https://knexjs.org/)<br>
Requirements:
- [docker-ce v16+](https://docs.docker.com/)
- [docker-compose v1.22.0+](https://github.com/docker/compose/releases)

## Installing / Getting started

```bash
$ git clone git@github.com:mazahell/koa-boilerplate.git
$ cd koa-boilerplate/
$ make up
$ make db-refresh
$ npm i
$ node server.js
```
This command should up koajs http server

## Before pushing to repository
- check your code by built-in js checker `make lint`, if any errors occur - you should fix them, try to use `make precommit`
- merge your branch with `master`, in which you propose pull request
- make pull request and wait for confirmation
- when your pull request was submited, then checkout on `master` branch and continue coding
- enjoy

## Test data
In app we have users `admin@mail.com` and `user@mail.com` with same password for each `123456`

## Tests
```bash
$ npm test
```

## Api Reference
In `development mode` documentation located at `{your_site_url}/docs`.

## Style guide
We use [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) eslint preset
# koa-test

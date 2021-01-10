# 4IT580: Team Pomodori Backend App

## Setup ENV Variables

```
cp ./.env.example ./.env
```

Edit `.env` file (DB user, password, ...)

## Install Dependencies

```bash
yarn install
```

## `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

## Seed database (structure only)

- Using phpMyAdmin or MySQL Workbench run following SQL: [`./db/emptySeed.sql`](./db/emptySeed.sql).
- Please use MariaDB 10.5.0 or newer (function `JSON_ARRAYAGG` is not avalilable in older versions).

## Run Production

```bash
yarn start
```

## Build Production

```bash
yarn build
```

### Build Production and Watch for Changes

```bash
yarn build:watch
```

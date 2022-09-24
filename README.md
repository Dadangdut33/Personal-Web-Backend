<p align="center">
  <a href="https://github.com/Dadangdut33/Personal-Web-Backend/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/Dadangdut33/Personal-Web-Backend"></a>
  <a href="https://github.com/Dadangdut33/Personal-Web-Backend/pulls"><img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/Dadangdut33/Personal-Web-Backend"></a>
  <br />
  <a href="https://github.com/Dadangdut33/Personal-Web-Backend/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Dadangdut33/Personal-Web-Backend?style=social"></a>
  <a href="https://github.com/Dadangdut33/Personal-Web-Backend/network/members"><img alt="GitHub forks" src="https://img.shields.io/github/forks/Dadangdut33/Personal-Web-Backend?style=social"></a>
</p>

Backend code of my personal web. Made using express. Take a look at [frontend](https://github.com/Dadangdut33/Personal-Web) for frontend code.

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Getting started](#getting-started)
  - [Set up your .env](#set-up-your-env)
  - [Available Scripts](#available-scripts)
    - [`npm start`](#npm-start)
    - [`npm run dev:ts`](#npm-run-devts)
    - [`npm run watch`](#npm-run-watch)
    - [`npm run build`](#npm-run-build)
  - [Run in ease while developing](#run-in-ease-while-developing)

# Getting started

Before contributing please consider reading some of the [docs](docs):

- [CONTRIBUTING.md](docs/CONTRIBUTING.md)
- [resources.md](docs/resources.md)

To start developing, first make sure that you have node installed. After that do `npm install` or `npm ci` to install all the dependencies.

## Set up your .env

Don't forget to set up your .env file located in root folder. You can follow the template in the [.env.example](.env.example) file.

## Available Scripts

In the api directory, you can run:

### `npm start`

Runs the API in the production mode (Compiled).

### `npm run dev:ts`

Runs the API in the development mode (Not compiled).

### `npm run watch`

Watches and re-compiles on every changes made to the codebase.

### `npm run build`

Builds the API for production to the `dist` folder.

## Run in ease while developing

- open a new terminal and run `npm run watch`
- then open another terminal and run `npm run dev`

**_this will get faster as it automatically re-compiles on the background_**

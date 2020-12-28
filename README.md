# Socket Chat - Client

[![Netlify Status](https://api.netlify.com/api/v1/badges/de5a8ed8-6659-4bde-a623-dc5386b835ad/deploy-status)](https://app.netlify.com/sites/determined-minsky-005ae7/deploys)

Simple single page chat application - Client part.

For server part go to [socket chat server](https://github.com/IVIosi/socket-chat-server).

## How It Works

### Technologies And Libraries

App is powered by [React JS](http://reactjs.org/) and [socket.io](http://socket.io/).

- [Babel](https://github.com/babel/babel) for transcompiling code and backward compatibility.
- [Webpack](https://github.com/webpack/webpack) for bundling purposes.
- [Jest](https://github.com/facebook/jest) and [RTL (React Testing Library)](https://github.com/testing-library/react-testing-library) for testing.
- [TypeScript](https://www.typescriptlang.org/) for adding types.
- [Sass](https://sass-lang.com/) as a stylesheet language.
- [ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/) and [Prettier](https://prettier.io/) for linting and code format.

TypeScript codes are compiled with Babel. All types are checked in pre-commit stage using [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky).

Styles are normalized to work properly on different browsers.
Sass variables are used for theming. Some mixins also added for some repeated styles. [PostCSS](https://github.com/postcss/postcss) used for automated adding of vendor prefixes and polyfilling modern CSS.

## Get Started Immediately

**You’ll need to have Node 10.16.0 or later version on your local development machine.** You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

**For working properly this app needs [socket chat server](https://github.com/IVIosi/socket-chat-server) up and running.**

1. Clone project.
2. Run `npm ci` in project root directory to install dependencies.
3. Rename **.env.example** to **.env**
4. Start project in developement mode using `npm run dev`. This command will open browser automatically.
5. Open another tab in incognito mode or in another browser and go to `http://localhost:3000`. Now messages can be sent and received between these two tabs.

## Commands

- Test will run with `npm run test` and `npm run test:watch`

- Code linting with `npm run lint:code` and style linting with `npm run lint:style`

- Building project and make it ready for deployment with `npm run build`.

## Structure of App

```
socket-chat-client
├── README.md
├── public
│   └── index.html
└── src
    ├── __tests__
    ├── components
    ├── helpers (Reusable utilities and custom hooks)
    ├── static (Base styles, images, SVG icons sprite)
    ├── app.tsx
    ├── index.tsx
    ├── styles.scss
    └── globals.d.ts
```

## Features

### Mentiond On Homework File:

Messages:

- [x] The current user's messages is on the right and other user's is on the left.
- [x] Input field with support of sending by _enter_ or _ctrl+enter_.
- [x] Users can send images by providing URL.
- [x] Send message and send image buttons.

Settings:

- [x] Modal for settings form.
- [x] All settings consumed and saved on LocalStorage.
- [x] Change user name field.
- [x] Change clock display format field.
- [x] Change send by _enter_ or _ctrl+enter_ format field.
- [x] Change clock display format field.
- [x] Reset all settings to their defaults.

Other Features:

- [x] Responsiveness.
- [x] Working on Chrome and Firefox latest versions.

### Added Features:

- [x] Display user avatar beside messages (show default avatar if avatar has not been set by user).
- [x] Show user avatar once for multiple continuous messages.
- [x] Add a11y attributes to HTML tags.
- [x] Display user name of received messages.
- [x] Disabling send message box when server is unreachable and showing appropriate message.

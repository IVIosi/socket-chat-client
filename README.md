# Socket Chat - Client

## Get Started Immediately
**You’ll need to have Node 10.16.0 or later version on your local development machine.** You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

1. Clone project.
2. Run ```npm ci``` in project root directory
3. Rename **.env.example** to **.env** 
4. Start project in developement mode using ```npm run dev```

## Structure of App

```
socket-chat-client
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── index.html
└── src
    ├── __tests__
    ├── static
    ├── app.tsx
    ├── index.tsx
    └── globals.d.ts
```
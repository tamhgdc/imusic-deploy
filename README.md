# imusic
## My link website
https://imusicvn.herokuapp.com

## Clone or download
```terminal
$ git clone https://github.com/dompham21/imusic.git
$ npm i
```
## Project structure
```terminal
LICENSE

package.json
.env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

## Prerequirements
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)
notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other
## Server-side usage(PORT: 8000)

```terminal
$ npm i       // npm install pacakges
$ npm run dev // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file
```


## Client-side usage(PORT: 3000)
```terminal
$ cd client   // go to client folder
$ npm i       // npm install pacakges
$ npm run dev // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```
# Dependencies(tech-stacks)
Client-side | Server-side
--- | ---
axios: ^0.15.3 | bcrypt-nodejs: ^0.0.3
babel-preset-stage-1: ^6.1.18|body-parser: ^1.15.2
chart.js: ^3.10.1 | cors: ^2.8.1
react: ^16.2.0 | request: ^2.88.2
react-dom: ^16.2.0 | express: ^4.14.0
react-redux: ^4.0.0 | jwt-simple: ^0.5.1
react-router-dom: ^4.2.2 | mongoose: ^4.7.4
react-icons | morgan: ^1.7.0
react-input-slider": ^6.0.0 | cloudinary ^1.25.2
react-lazy-load-image-component: ^1.5.1 | axios-cookiejar-support ^1.0.1
react-loading-skeleton": ^2.1.1 | crypto ^1.0.1
react-scripts": ^4.0.1
react-toastify": ^6.2.0
redux": "^4.0.5",
redux-promise": "^0.6.0",
redux-saga": "^1.1.3",
redux-thunk": "^2.3.0",
swiper": "^6.4.1"

# Screenshots of this project
User visit public and Home page
![User visit public and Home page](https://res.cloudinary.com/dmriwkfll/image/upload/v1623428048/Screen_Shot_2021-06-11_at_23.04.16_u7xtib.png)


User Home page and can see rank music
![User Home page and can see rank music](https://res.cloudinary.com/dmriwkfll/image/upload/v1623428048/Screen_Shot_2021-06-11_at_23.04.26_d3fizt.png)


After play song user can see queue
![After play song user can see queue](https://res.cloudinary.com/dmriwkfll/image/upload/v1623428048/Screen_Shot_2021-06-11_at_23.04.49_mmwxgg.png)


Search song, artist or playlist
![Search song, artist or playlist](https://res.cloudinary.com/dmriwkfll/image/upload/v1623428047/Screen_Shot_2021-06-11_at_23.05.06_ax7jzl.png)


## BUGs, comments or you need API key 
Email Me: dompham300721@gmail.com (welcome, say hi)


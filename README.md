Monday Poker
============

Little server to make bots fights around a poker table !

To initialize the server :
```shell
npm install
```

To start the server :
```shell
npm start
```

It's based on an existing server right there : https://github.com/mdp/MachinePoker
It started as a fork on which we added a front to display games. But like every one is not at ease with coffee inside HackingMonday, we decided to remake it with ES6/7 features.
To enable ES6/7 features we decided to use 6to5.

At the time we had more options :
* Traceur, but no real useful differences at this time, but so we choose cause Traceur needs more run time polyfills.
* io.js, but features at this point were not enough to fully practice ES6/7 features and learn to use them.
* echo js, only stable on macosx at the time.
* much more but not enough advanced
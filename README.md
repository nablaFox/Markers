# A simple multiplayer mini game

This project demonstrates the use of the [socket.io](https://socket.io) library. The game mechanics are simple:
Each turn, you can choose to pick 1 to 3 available markers. The player who picks the last marker loses.

---

![preview](https://github.com/nablaFox/Markers/blob/main/preview.png?raw=true)

---

Explore the live demo here: [Markers Demo.](https://markers-linfozzi.web.app/), 

## Development

if the demo is not working (most probably, since I will not have the AWS instance run forever) clone the repository, and execute:

```sh
npm install
cd server && npm run start
cd client && npm run dev
```

Then open http://localhost:5173 (the port may vary; check the output of the last command) and connect to a game using two different browsers.

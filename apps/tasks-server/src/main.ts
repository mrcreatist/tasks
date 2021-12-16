import * as routes from './app/route'
import * as express from 'express';

const app = express();
app.use(express.json());

routes.register(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);




// const app = require('express')();
// const cors = require('cors');
// let server = require('http').createServer(app);
// let io = require('socket.io')(server);
// const fs = require('fs');
// const file = 'task-data.json';

// app.use(cors());

// function writeDataToFile(dataStore) {
//   let data = JSON.stringify(dataStore);
//   if (data && data.length) {
//     fs.writeFileSync(file, data);
//   }
// }

// function readDataFromFile() {
//   if (!fs.existsSync(file)) {
//     writeDataToFile(null);
//   }
//   let rawData = fs.readFileSync(file);
//   return JSON.parse(rawData);
// }

// io.on('connection', (socket) => {
//   console.log('welcome', socket.id);
//   socket.emit('fireInTheHole', readDataFromFile());

//   socket.on('fireInTheHole', () => console.log('fireInTheHole event triggered'));
//   socket.on('makeFireInTheHole', (data) => {
//     writeDataToFile(data);
//     socket.broadcast.emit('fireInTheHole', readDataFromFile());
//   });
//   socket.on('disconnect', () => console.log('disconnected from server'));
// });

// server.listen(process.env.PORT || 3333, () => console.log(`listening on ${process.env.PORT || 3333}`));
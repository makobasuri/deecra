const express = require('express');
const app = express();
const server = require('http').Server(app);
const chokidar = require('chokidar');
const io = require('socket.io').listen(server);
const serveDev = require('http').Server();

app.use(express.static(__dirname + '/public', {'fallthrough': false}));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

server.listen(8010, () => console.log(`listening on ${server.address().port}`));

serveDev.listen(8013, () => console.log(`listening on ${server.address().port}`));

io.on('connection',function (client) {
	console.log("Socket connection is ON!");
});


chokidar.watch(__dirname + '/public', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
	console.log('file changed: ' + path, 'event:' + event);
	io.emit('fileChanged', 'yea file has been changed.');
});

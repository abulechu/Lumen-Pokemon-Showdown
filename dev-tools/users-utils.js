function createConnection (ip, workerid, socketid) {
	if (!workerid || !socketid) {
		workerid = Object.keys(Sockets.workers)[0];
		socketid = 1;
		while (Users.connections[workerid + '-' + socketid]) {
			socketid++;
		}
	}
	var connectionid = workerid + '-' + socketid;
	var connection = Users.connections[connectionid] = new Users.Connection(connectionid, Sockets.workers[workerid], socketid, null, ip || '127.0.0.1');
	return connection;
}

function createUser (connection) {
	if (!connection) connection = createConnection();
	var user = new Users.User(connection);
	connection.user = user;
	user.joinRoom('global', connection);
	return user;
}

exports.Connection = createConnection;
exports.User = createUser;

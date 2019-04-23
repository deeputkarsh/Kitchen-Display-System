"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectMongo = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('app');
_mongoose.default.Promise = Promise;

_mongoose.default.connection.on('connected', () => {
  log('Connection Established');
});

_mongoose.default.connection.on('reconnected', () => {
  log('Connection Reestablished');
});

_mongoose.default.connection.on('disconnected', () => {
  log('Connection Disconnected');
});

_mongoose.default.connection.on('close', () => {
  log('Connection Closed');
});

_mongoose.default.connection.on('error', error => {
  log('ERROR: ' + error);
  process.exit(1);
});

_mongoose.default.set('debug', process.env.MONGO_DEBUG);

const connectMongo = async () => {
  /* const { MONGO_USER, MONGO_PASS, MONGO_REPLICA_SET, MONGO_HOSTS, MONGO_DBNAME } = process.env
  const authstr = MONGO_USER && MONGO_PASS ? `${MONGO_USER}:${MONGO_PASS}@` : ''
  const replicaSet = MONGO_REPLICA_SET ? `?replicaSet=${MONGO_REPLICA_SET}` : ''
  const connectionuri = `mongodb://${authstr}${MONGO_HOSTS}/${MONGO_DBNAME}${replicaSet}` */
  const connectionuri = process.env.MONGO_URI;
  log(connectionuri);

  try {
    await _mongoose.default.connect(connectionuri, {
      autoReconnect: true,
      connectTimeoutMS: 5000,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  } catch (error) {
    log("ERROR: Couldn't connect to mongo");
    process.exit(1);
  }
};

exports.connectMongo = connectMongo;
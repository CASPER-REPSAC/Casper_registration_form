const mongoose = require('mongoose');

module.exports = () => {
  function Database() {
    mongoose.connect('localhost:27017', function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected');
    });
  }
  Database();
  mongoose.connection.on('disconnected', connect);
  require('./mongodb/createSch'); 
};
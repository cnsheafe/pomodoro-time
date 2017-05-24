const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  settings: {
    work: Number,
    break: Number
  },
  history: [{
    date: Date,
    work: Number,
    break: Number,
    mood: Number,
    note: String
  }]
});

UserSchema.methods.apiRepr = () => {
  return {
    username: this.username,
    settings: this.settings || null,
    history: this.history || null
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.hashPassword = password => {
  return bcrypt.hashSync(password);
};

const User = mongoose.model('User', UserSchema);
module.exports = {User};

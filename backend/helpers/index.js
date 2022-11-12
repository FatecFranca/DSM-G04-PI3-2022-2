const { default: mongoose } = require('mongoose');

exports.toObjectId = (string) => {
  return mongoose.Types.ObjectId(string);
}

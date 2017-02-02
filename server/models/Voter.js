var mongoose = require('mongoose');

var voterSchema = mongoose.Schema({
	_creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  user: Object
});

var Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;

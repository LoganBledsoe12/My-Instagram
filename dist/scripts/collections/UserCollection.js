var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var UserModel = require('../models/UserModel.js');

module.exports = Backbone.Collection.extend({
	model: UserModel,
	url:'http://tiy-fee-rest.herokuapp.com/collections/logan-users'
});
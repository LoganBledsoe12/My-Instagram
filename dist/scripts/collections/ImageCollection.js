var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Picture = require('../models/ImageModel.js');

module.exports = Backbone.Collection.extend({
	model: Picture,
	url:'http://tiy-fee-rest.herokuapp.com/collections/here-you-go-logan'
});
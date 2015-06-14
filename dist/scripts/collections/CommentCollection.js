var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var CommentModel = require('../models/CommentModel.js');

module.exports= Backbone.Collection.extend({
	model:CommentModel,
	url:'http://tiy-fee-rest.herokuapp.com/collections/logan-imageboard-comments'
});
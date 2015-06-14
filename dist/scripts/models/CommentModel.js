var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone.Model.extend({
	defaults: {
		text:null,
		postId:null
	},
	urlRoot:'http://tiy-fee-rest.herokuapp.com/collections/logan-imageboard-comments',
	idAttribute: '_id'
});
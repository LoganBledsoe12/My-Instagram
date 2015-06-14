var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
module.exports = Backbone.Model.extend({
	defaults: {
		name:null,
		password:null
	},
	urlRoot:'http://tiy-fee-rest.herokuapp.com/collections/logan-users',
	idAttribute: '_id'
});
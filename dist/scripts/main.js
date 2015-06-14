var $ = require('jquery');
var _ = require('backbone/node_modules/underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var homePageContainer = $('#homepage-container');
var userContainer = $('#user-pass-contain');
var usrContainer = $('#usrcontainer')
userContainer.hide();
usrContainer.hide();
// var btnSignIn = $('#btn-sign-in');
var App = Backbone.Router.extend({
		routes:{
			'': 'home',
			'login': 'login',
			'profile':'profile',
			'all': 'all'
	},
	home:function(){
			userContainer.hide();
			usrContainer.hide();
			homePageContainer.show();
		
			//:function that gets called when you type in URL
		},
	login:function(){
		homePageContainer.hide()
     	userContainer.show()
     	usrContainer.hide()
     },
     all:function(){
     	homePageContainer.hide()
    	userContainer.hide()
    	usrContainer.show()

    	ImageList.fetch({
		success:function(){
			commentList.fetch();
		},

	});
			
		},

     profile:function(){
     	homePageContainer.hide()
    	userContainer.hide()
    	usrContainer.show()

    	ImageList.fetch({
		success:function(){
			commentList.fetch();
		},

	});
     }
});
var currentUser = null;
var myRouter = new App();
Backbone.history.start();
$('#btnsignup').click (btnsignup)
	function btnsignup(){
		if ($('#username').val() == ('')){
			alert('Please enter a username')
			return
		}

		else if ($('#password').val() == ('')){
			alert('Please enter a password')
			return
		}

		

		
    var newuser = new UserModel()
    newuser.set('name',$('#username').val().trim())
    newuser.set('password',$('#password').val().trim())
    
  	newuser.save().then(function(e){
  		currentUser = new UserModel(e); 
  		myRouter.navigate('/profile',{trigger:true})
  	})
    $('#divusername').append($('#username').val())
}







$('#btn-log-in').click (btnLogIn)
    function btnLogIn (){
    	homePageContainer.hide()
     	userContainer.show()


   }

$('#btn-sign-in').click (btnSignIn)
	function btnSignIn(){
		
    
    var loggedInUser = UserList.findWhere({
					name: $('#username').val().trim(),
					password: $('#password').val().trim()
				});
    if (!loggedInUser){
    	alert('Username or password does not exist')
    }
    else{
    	myRouter.navigate('/profile',{trigger:true})
    	currentUser = loggedInUser
    }
    
    $('#divusername').append($('#username').val())
}
var ImageCollection = require('./collections/ImageCollection.js');
var ImageModel = require ('./models/ImageModel.js');
var CommentCollection = require('./collections/CommentCollection.js');
var CommentModel = require ('./models/CommentModel.js');
var UserModel = require ('./models/UserModel.js')
var UserCollection = require ('./Collections/UserCollection.js')
var UserList = new UserCollection();
var ImageList = new ImageCollection();
var commentList = new CommentCollection();



$(document).ready(function() {
    addimageform.hide();
    $('#btnaddphoto').click (addphoto)
    function addphoto (){
        addimageform.slideToggle();
    }

    
	
	UserList.fetch();

    
    var todoItemBuilder = _.template($('#list-template').html());

   
    $('#addimageform').on('submit', function(e) {            
        e.preventDefault();                                 
        console.log('item submitted');

        
        var newTodo = new ImageModel({                            
            url: $('#imageurl').val(),
            caption: $('#imagecaption').val(),
            userId: currentUser.get('_id')
        });

        if(newTodo.isValid()) {
            console.log('the todo item is valid');
            
            
            newTodo.save({
			success:function(e){
		}
	}).then(function(e){
		ImageList.add(e);
	}); 
        }
        else {
            console.log('there was an error');
            alert(newTodo.validationError);
        }
        addimageform.hide();
        $('#imageurl').val('');
        $('#imagecaption').val('');
                                        
    });
    $('body').on ('keypress','input', function(e){
        if (e.which == 13){
            var picId = $(e.target).attr('pictureId');
            var comment = $(e.target).val();
            var picture = ImageList.get(picId);
            console.log (picture);
            var comments =(picture.get('comments'));
            if (comments==null){
                comments=new CommentCollection()
                comments.on('add', function(model){
                    $('#'+picId).append(model.get('text')+'<br>');
                })
                picture.set('comments',comments);
            }
            var c = new CommentModel({text:comment,postId:picId});

            comments.add(c);
            picture.save();
            c.save();



        }
    })
    $('body').on ('click','.btnlike', function(e){
    	var picId = $(e.target).attr('pictureId');
    	var picture = ImageList.get(picId);
    	picture.set('likes', picture.get('likes')+1)
    	picture.save();
    	$('#likes'+picId).text(picture.get('likes'))
    })

    
    ImageList.on('add', function(model) {
    	if (!currentUser || model.get('userId')===currentUser.get('_id')){
    		var todoHtml = todoItemBuilder(model.attributes);    
       		console.log(todoHtml);

        $('#picturecontainer').append(todoHtml);

    	}
  
        
    });
    commentList.on('add', function(addedComment){
		$('#'+addedComment.get('postId')).append(addedComment.get('text')+'<br>');
	});

});
var addimageform = $('#addimageform');
var btnaddphoto = $('btnaddphoto');
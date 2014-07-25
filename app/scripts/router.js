'use strict';
 
var AppRouter = Backbone.Router.extend({
 
    routes: {
        ''                            : 'renderHome',
        'players'                     : 'renderPlayers',
        'players/:playername'         : 'renderPlayer',
    },
 
    initialize: function () {
        
    },
 
    renderHome: function () {
        $('.editImage').attr('src','http://placehold.it/370x300');
        $('.url-input').val('');
        $('.name-input').val('');
    },
 
    renderPlayers: function () {
        $('.editImage').attr('src','http://placehold.it/370x300');
        console.log('render players works');
        
    },
 
    renderPlayer: function () {
    },

});
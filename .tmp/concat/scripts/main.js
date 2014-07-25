'use strict';

var DetailView = Backbone.View.extend({

    className: 'detail-view',

    template: _.template($('.detail-view-template').text()),

    events: {
        'click .saveButton'             : 'updateModel',
        'click .newButton'              : 'createPhoto',
        'click .deleteButton'           : 'deletePlayer',
        'click .moveToInjuredButton'    : 'movePlayerToDL',
        'click .moveToAAAButton'        : 'movePlayerToAAA',
        'click .moveToActiveButton'     : 'movePlayerToActive',
        'click .moveToActiveDLButton'   : 'movePlayerToActiveDL',
        'click .dlCollectionButoon'     : 'turnOnDLCollection',
        'click .aaaCollectionButton'    : 'turnOnAAACollection',
        'click .activeCollectionButton' : 'turnOnActiveCollection',
        'click .resetCollectionButton'  : 'resetCollections'




    },

    initialize: function(){
        this.listenTo(photos, 'add', function(photo){
            new ThumbnailView({model: photo});
        });


        $('.editContainer').prepend(this.el);
        this.render();
    },

    render: function(){

        var renderedTemplate = this.template(this.model.attributes);
        this.$el.html(renderedTemplate);
        return this;
    },

    updateModel: function(){

        var that = this;

        this.model.set({
            url:      this.$el.find('.url-input').val(),
            comment:  this.$el.find('.name-input').val()
        });

        photos.add(this.model);

        this.model.save().done(function(){
            that.$el.find('.status').html('You Added A New Player!');
        });
    },

    deletePlayer: function(){
        this.model.destroy();
    },

    movePlayerToDL: function(){

        $.post('http://tiny-pizza-server.herokuapp.com/collections/injuredListContainer', {
            url     : this.model.attributes.url,
            comment : this.model.attributes.comment
        });
        this.model.destroy().done;
    },

    movePlayerToAAA: function(){

        $.post('http://tiny-pizza-server.herokuapp.com/collections/aaaContainer', {
            url     : this.model.attributes.url,
            comment : this.model.attributes.comment
        });
        this.model.destroy().done;
    },

    movePlayerToActive: function(){

        $.post('http://tiny-pizza-server.herokuapp.com/collections/Charliephoto', {
            url     : this.model.attributes.url,
            comment : this.model.attributes.comment
        });
        this.model.destroy().done;
    },

     movePlayerToActiveDL: function(){

        $.post('http://tiny-pizza-server.herokuapp.com/collections/injuredListContainer', {
            url     : this.model.attributes.url,
            comment : this.model.attributes.comment
        });
    },


    createPhoto: function(){

        var photoInstance = new Photo();

        this.model = photoInstance;

        this.$el.find('.url-input').val('');
        this.$el.find('.name-input').val('');
        this.$el.find('img').attr('src','http://placehold.it/370x300');


    },

    turnOnDLCollection: function(){

    $('.injuredListContainer').show();
    $('.activeCollectionButton').show();
    $('.dlCollectionButoon').hide();
    $('.activeRosterContainer').hide();
    $('.aaaListContainer').hide();
    $('.aaaCollectionButton').show();
    // $('.resetCollectionButton').show();

    },

    turnOnAAACollection: function(){

    $('.injuredListContainer').hide();
    $('.activeCollectionButton').show();
    $('.dlCollectionButoon').show();
    $('.activeRosterContainer').hide();
    $('.aaaListContainer').show();
    $('.aaaCollectionButton').hide();
    // $('.resetCollectionButton').show();
        
    },

    turnOnActiveCollection: function(){

    $('.injuredListContainer').hide();
    $('.activeCollectionButton').hide();
    $('.dlCollectionButoon').show();
    $('.activeRosterContainer').show();
    $('.aaaListContainer').hide();
    $('.aaaCollectionButton').show();
    // $('.resetCollectionButton').show();
            
    },

    resetCollections: function(){

    $('.injuredListContainer').show();
    $('.activeCollectionButton').hide();
    $('.dlCollectionButoon').hide();
    $('.activeRosterContainer').show();
    $('.aaaListContainer').show();
    $('.aaaCollectionButton').hide();
    // $('.resetCollectionButton').hide();
        
    },
});
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
'use strict';
 
var Photo = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
        comment: 'Go Red Sox',
        url: 'http://content.sportslogos.net/logos/53/53/full/ba0u6pkfm7zmorlyyy00cx0os.gif'
    },
});
 
var PhotoCollection = Backbone.Collection.extend({
    model: Photo,
    url: 'http://tiny-pizza-server.herokuapp.com/collections/Charliephoto'
});

///////////////////////////////////

var InjuredPlayer = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
        comment: 'Go Red Sox',
        url: 'http://content.sportslogos.net/logos/53/53/full/ba0u6pkfm7zmorlyyy00cx0os.gif'
    },
});
 
var InjuredCollection = Backbone.Collection.extend({
    model: InjuredPlayer,
    url: 'http://tiny-pizza-server.herokuapp.com/collections/injuredListContainer'
});

//////////////////////////////////

var AAAPlayer = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
        comment: 'Go Red Sox',
        url: 'http://content.sportslogos.net/logos/53/53/full/ba0u6pkfm7zmorlyyy00cx0os.gif'
    },
});
 
var AAACollection = Backbone.Collection.extend({
    model: InjuredPlayer,
    url: 'http://tiny-pizza-server.herokuapp.com/collections/aaaContainer'
});


////////////////THUMBNAIL VIEW BEGIN

var ThumbnailView = Backbone.View.extend({
 
    className: 'thumbnail',
 
    thumbnailTemplate: _.template($('.thumbnail-template').text()),
 
    events: {
        'click' : 'showDetailView'
    },
 
    initialize: function(){
        $('.activeContainer').append(this.el);
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'add', this.render);
        this.listenTo(this.model, 'remove', this.render);
        this.render();
    },
 
    render: function(){
        if (this.model.attributes.hasOwnProperty('url')) {
            var renderedTemplate = this.thumbnailTemplate(this.model.attributes);
            this.$el.html(renderedTemplate);
        }
        
    },
 
    showDetailView: function(){
        detailViewInstance.remove();
        detailViewInstance = new DetailView({model: this.model});
    }

});

//////////////////

var InjuredView = Backbone.View.extend({
 
    className: 'thumbnail',
 
    thumbnailTemplate: _.template($('.thumbnail-template').text()),
 
    events: {
        'click' : 'showDetailView'
    },
 
    initialize: function(){
        $('.injuredContainer').append(this.el);
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'add', this.render);
        this.listenTo(this.model, 'remove', this.render);
        this.render();
    },
 
    render: function(){
        if (this.model.attributes.hasOwnProperty('url')) {
            var renderedTemplate = this.thumbnailTemplate(this.model.attributes);
            this.$el.html(renderedTemplate);
        }
        
    },
 
    showDetailView: function(){
        detailViewInstance.remove();
        detailViewInstance = new DetailView({model: this.model});
    }

});

///////////////

var AAAView = Backbone.View.extend({
 
    className: 'thumbnail',
 
    thumbnailTemplate: _.template($('.thumbnail-template').text()),
 
    events: {
        'click' : 'showDetailView'
    },
 
    initialize: function(){
        $('.aaaContainer').append(this.el);
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'add', this.render);
        this.listenTo(this.model, 'remove', this.render);
        this.render();
    },
 
    render: function(){
        if (this.model.attributes.hasOwnProperty('url')) {
            var renderedTemplate = this.thumbnailTemplate(this.model.attributes);
            this.$el.html(renderedTemplate);
        }
        
    },
 
    showDetailView: function(){
        detailViewInstance.remove();
        detailViewInstance = new DetailView({model: this.model});
    }

});
///////////////

var injuredPlayers = new InjuredCollection();

injuredPlayers.fetch().done(function(){
    injuredPlayers.each(function(photo){

        new InjuredView({model: photo});

    });
});

///////////////////////////////////

var aaaPlayers = new AAACollection();

aaaPlayers.fetch().done(function(){
    aaaPlayers.each(function(photo){

        new AAAView({model: photo});

    });
});

//////////////////////////////////Starting Collection for Active Players and initial Detail View

var photos = new PhotoCollection();
var detailViewInstance;


photos.fetch().done(function(){
    photos.each(function(photo){

        new ThumbnailView({model: photo});

    });

    detailViewInstance = new DetailView({ model: photos.first() });
});

///////////////////////////////Backbone History Starter

var app = new AppRouter();

Backbone.history.start();
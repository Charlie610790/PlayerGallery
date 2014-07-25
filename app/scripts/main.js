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
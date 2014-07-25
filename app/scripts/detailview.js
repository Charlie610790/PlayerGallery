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
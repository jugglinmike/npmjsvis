define(function(require) {
  var Backbone = require('backbone');
  var $ = require('jquery');

  var controlTemplate = require('tmpl!src/modules/templates/topbar-grid');

  return Backbone.View.extend({

    template : require('tmpl!src/modules/templates/topbar-start'),
    events: {
      'click li' : 'onClick',
      'click .help' : 'onHelpClick'
    },

    initialize: function() {
      this.rendered = false;

      if (window.location.pathname === "/about") {
        this.showingHelp = true;
      } else {
        this.showingHelp = false;
      }
    },

    setData: function(data) {
      this.data = data;
    },

    onClick: function(ev) {
      var breakdown = $(ev.target).data('grid');
      this.setBreakdown(breakdown);

      this.trigger('navigate', 'breakdown/' + breakdown);
    },

    setBreakdown: function(breakdown) {

      if (!this.rendered) {
        this.$el.html(controlTemplate());
        this.rendered = true;
      }

      if (typeof this.selected === "undefined") {
        this.selected = this.$el.find('li.selected');
      }

      if (breakdown !== this.breakdown) {
        this.selected.removeClass('selected');

        this.selected = this.$el.find('li[data-grid='+ breakdown +']');
        this.selected.addClass('selected');

        this.breakdown = breakdown;
      }
    },

    onHelpClick: function() {
      if (!this.showingHelp) {
        this.showingHelp = true;
        this.currentLocation = window.location.pathname === "/about" ? "/" : window.location.pathname;
        this.trigger('navigate', 'about');
      } else {
        this.showingHelp = false;
        this.trigger('navigate', this.currentLocation);
        delete this.currentLocation;
      }
    }

  });
});

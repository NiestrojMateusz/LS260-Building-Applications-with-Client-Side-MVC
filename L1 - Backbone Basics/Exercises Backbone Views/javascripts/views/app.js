var AppView = Backbone.View.extend({
  el: 'body',
  template: Handlebars.templates.app,
  newPersonTemplate: Handlebars.templates.newPerson,
  events: {
    'click #add-person': 'renderNewPersonModal',
    'submit': 'savePerson',
    'click .btn-cancel': 'closeModal'
  },
  savePerson: function(e) {
    e.preventDefault();
    var $form = this.$('form');

    var personData = {
      name: $form.find('#name').val(),
      colors: [$form.find('#color1').val(), $form.find('#color2').val(), $form.find('#color3').val()],
    };

    app.list.add(personData);
    this.closeModal();
  },

  closeModal: function(e) {
    this.$('#new-person-modal').remove();
  },
  render: function() {
    this.$el.html(this.template());
  },
  renderNewPersonModal: function() {
    this.$el.append(this.newPersonTemplate());
  },
});
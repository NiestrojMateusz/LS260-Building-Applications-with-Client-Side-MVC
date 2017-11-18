var App = {

  bind: function() {
    this.$body.on("click", "a", this.removeItem.bind(this));
  },
  init: function() {
    this.Items = new ItemsCollection(items_json);
    this.View = new ItemsView( {collection: this.Items});
    this.Items.sortByName();
  }

}; // parent application object

const ItemModel = Backbone.Model.extend({
  idAttribute: "id",
  initialize: function(){
    this.collection.incrementID();
    this.set("id", this.collection.last_id);
  }
});

var ItemsView = Backbone.View.extend({
  el: "tbody",
  template: Handlebars.compile($('#items').html()),
  events: {
    "click a": "removeItem"
  },
  render: function() {
    this.$el.html(this.template({items: this.collection.toJSON()}));
  },
  removeItem: function(e) {
    e.preventDefault();
    var model = this.collection.get(+$(e.target).attr("data-id"));
    this.collection.remove(model);
  },
  initialize: function() {
    this.listenTo(this.collection, "remove reset rerender", this.render)
  }
})


var ItemsCollection = Backbone.Collection.extend({
  last_id: 0,
  model: ItemModel,
  incrementID: function(prop) {
    this.last_id++;
  },
  sortByProp: function(prop) {
    this.comparator = prop;
    this.sort();
    this.models = _(this.models).sortBy(function(m) {
      return m.attributes[prop];
    });
    this.trigger("rerender");
  },
  sortByName: function(){
    this.sortByProp("name")
  },
  initialize: function() {
    this.on("add", this.sortByName)
  }
});

Handlebars.registerPartial("item", $("#item").html());

$("form").on("submit", function(e) {
  e.preventDefault();
  let inputs = $(this).serializeArray(),
      attrs = {},
      item;

  inputs.forEach(function(input) {
    attrs[input.name] = input.value;
  });

  item = App.Items.add(attrs);
  this.reset();
});

$('th').on("click", function(){
  let prop = $(this).attr("data-prop");
  App.Items.sortByProp(prop);
});

$("p a").on("click", function(e) {
  e.preventDefault();
  App.Items.reset();
})


App.init();
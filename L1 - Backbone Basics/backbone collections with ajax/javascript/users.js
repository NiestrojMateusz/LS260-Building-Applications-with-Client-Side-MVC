var users_data = [{
  id: 1,
  name: "Leanne Graham"
}, {
  id: 2,
  name: "Ervin Howell"
}, {
  id: 3,
  name: "Clementine Bauch"
}];

var User = Backbone.Model.extend({}),
    Users = Backbone.Collection.extend({
      model: User
    }),
    blog_authors;

blog_authors = new Users();
blog_authors.reset(users_data);

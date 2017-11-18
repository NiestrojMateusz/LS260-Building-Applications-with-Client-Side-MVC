var User = Backbone.Model.extend({
  url: "https://jsonplaceholder.typicode.com/users"
});

var template = Handlebars.compile($("#users").html());

var Users = Backbone.Collection.extend({
  initialize: function() {
    this.on("sync sort", renderCollection);
  },
  url: "https://jsonplaceholder.typicode.com/users",
  model: User,
  parse: function(response) {
    response.forEach(function(user) {
      user.company_name = user.company.name;
      user.catchPhrase = user.company.catchPhrase;
      user.company_bs = user.company.bs;
      delete user.company;
    });
    return response;
  }
});

function renderCollection() {
  document.body.innerHTML = template({users: this.toJSON()});
}


var blog_writers = new Users();

blog_writers = new Users();

blog_writers.fetch();


blog_writers.create({ name: "Matt", email: "test@test.com"  }, {
});


blog_writers.set({
  id: 1,
  name: "Matt",
  email: "test@test.com"
});

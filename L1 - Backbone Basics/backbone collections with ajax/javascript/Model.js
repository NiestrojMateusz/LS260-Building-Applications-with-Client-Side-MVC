var PostModel = Backbone.Model.extend({
  initialize: function() {
    if (!this.get("id")) {
      this.set("id", this.collection.nextID());
    }
  },
  urlRoot: "https://jsonplaceholder.typicode.com/posts"
});

var Posts = Backbone.Collection.extend({
  model: PostModel,
  url: "https://jsonplaceholder.typicode.com/posts",
  last_id: 0,
  setLastID: function() {
    if (this.isEmpty()) {return;}

    this.last_id = this.last().get("id");
  },
  nextID: function() {
    return ++this.last_id;
  },
  initialize: function() {
    this.on('sync', this.setLastID);
  }
});

var blog_roll = new Posts();

blog_roll.fetch({
  reset: true,
  success: function(collection) {
    console.log(collection.toJSON());
  }
});


blog_roll.set({
  id: 1,
  userId: 1,
  title: "My First Post",
  body: "This is my first blog post! Yay!"
});

let first_post = blog_roll.get(1);

// Now we can check the first_post to make sure the record was updated
console.log(first_post.toJSON());

var posts_by_author_1 = blog_roll.where({ userId: 1 });
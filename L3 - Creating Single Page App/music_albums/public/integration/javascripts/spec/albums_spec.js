describe("Albums collection", function() {
  it("fetches a collection of three albums", function(){
    var albumsLoaded = App.albumsLoaded;
    App.albumsLoaded = function() {
      albumsLoaded.apply(App, arguments);
      expect(App.albums.models.length).toBe(3);
      expect(App.albums.models[0].attributes.title).toBe("string");
      done();
    };

    App.init()
  });
});
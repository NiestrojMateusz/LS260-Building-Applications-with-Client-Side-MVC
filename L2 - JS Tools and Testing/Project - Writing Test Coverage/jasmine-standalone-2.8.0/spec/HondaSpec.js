describe("Honda constructor", function() {

  it("inherits the Vehicle prototype", function() {
    var car = new Honda("Civic");
    expect(car.toString()).toEqual("Honda Civic");
  })

  it("sets the model property when a valid model is passed in", function() {
    var car = new Honda("Civic");

    expect(car.model).toEqual("Civic");
    expect(car.make).toEqual("Honda")
  });

  it("throws an error if an invalid model is passed in", function() {
    var createInvalidCar = function() {
      var car = new Honda("Panda");
    }

    expect(createInvalidCar).toThrowError();
  });

  it("returns a list of valid models", function() {
    var models = Honda.getModels();

    expect(models.length).toBeDefined();
    expect(models).toContain("Civic");
  });

  it("calls getPrice when a new car is created", function() {
    spyOn(Honda, "getPrice");
    var car = new Honda("Civic");

    expect(Honda.getPrice).toHaveBeenCalled();
    expect(Honda.getPrice).toHaveBeenCalledWith("Civic");
  });

  it("returns a price for the passed in model", function() {
    expect(Honda.getPrice("Civic")).toBeGreaterThan(0);
  });

  it("returns a price less than 15000 when a Civic is created", function() {
    var car = new Honda("Civic");
    expect(car.price).toBeLessThan(15000);
  });
  it("returns a price greater than 10000 when a CR-Z is created", function() {
    var car = new Honda("CR-Z");
    expect(car.price).toBeGreaterThan(10000);
  });
});
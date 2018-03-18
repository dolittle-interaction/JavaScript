describe("when asking if it can resolve a type that is registered", function () {
    Dolittle.WellKnownTypesDependencyResolver.types.something = "Hello";

    var resolver = new Dolittle.WellKnownTypesDependencyResolver();

    var result = resolver.canResolve(null, "something");

    it("should return true", function () {
        expect(result).toBe(true);
    });
});
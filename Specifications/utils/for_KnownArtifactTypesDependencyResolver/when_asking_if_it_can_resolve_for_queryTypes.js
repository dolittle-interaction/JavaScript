describe("when asking if it can resolve for queryTypes", sinon.test(function () {

    var resolver,
        canResolve,
        propertyToResolve,
        namespace;

    beforeEach(function () {
        Dolittle.commands = sinon.stub().returns({ Command: function () { } });
        Dolittle.read = sinon.stub().returns({
            ReadModelOf: function () { },
            Query: function () { }
        });

        resolver = new Dolittle.KnownArtifactTypesDependencyResolver();
        canResolve = false;
        propertyToResolve = "queryTypes";
        namespace = {};
        
        canResolve = resolver.canResolve(namespace, propertyToResolve);
    });

    it("should return true", function () {
        expect(canResolve).toBe(true);
    })

}));
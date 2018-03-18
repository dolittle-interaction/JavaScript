describe("when asking if map exists for source and target without any maps for the combination", function () {

    var mapType = null;
    var result = null;

    beforeEach(function () {
        mapType = Dolittle.mapping.Map;
        Dolittle.mapping.Map = Dolittle.Type.extend(function () { });

        var maps = Dolittle.mapping.maps.createWithoutScope();
        var sourceType = Dolittle.Type.extend(function () { });
        var targetType = Dolittle.Type.extend(function () { });

        result = maps.hasMapFor(sourceType, targetType);
    });

    afterEach(function () {
        Dolittle.mapping.Map = mapType;
    });

    it("should not have map", function () {
        expect(result).toBe(false);
    });
});

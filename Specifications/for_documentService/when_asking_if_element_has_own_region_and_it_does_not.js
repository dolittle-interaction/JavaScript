describe("when asking if element has own region and it does not", function () {
    var service = Dolittle.documentService.createWithoutScope({
        DOMRoot: {}
    });

    var element = $("<div/>")[0];
    var hasRegion = service.hasOwnRegion(element);

    it("should return that it does not have", function () {
        expect(hasRegion).toBe(false);
    });
});
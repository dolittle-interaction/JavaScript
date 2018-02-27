﻿describe("when getting for an element that has region", function () {

    var originalView = {};
    var region = {
        existing: "region",
        view: ko.observable(originalView)
    };

    var element = {
        DOM:"element"
    };

    var view = {
        element: element
    };

    var documentService = {
        hasOwnRegion: sinon.mock().withArgs(element).returns(true),
        getRegionFor: sinon.mock().withArgs(element).returns(region)
    };

    var regionDescriptorManager = {
        describe: sinon.stub()
    };

    var messengerFactory = { messenger: "factory" };
    var operationsFactory = { operations: "factory" };
    var tasksFactory = { tasks: "factory" };

    var instance = doLittle.views.regionManager.createWithoutScope({
        documentService: documentService,
        regionDescriptorManager: regionDescriptorManager,
        messengerFactory: messengerFactory,
        operationsFactory: operationsFactory,
        tasksFactory: tasksFactory
    });

    var regionReturned = instance.getFor(view);

    it("should get the region from the element", function () {
        expect(regionReturned).toBe(region);
    });

    it("should change the view", function () {
        expect(region.view()).toBe(view);
    });
});
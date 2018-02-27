﻿describe("when getting value for view with type specified", function () {
    var typeConverters = {
        convertTo: sinon.stub().returns("5")
    };
    var stringFormatter = {
        hasFormat: sinon.stub().returns(false)
    };

    var pipeline = doLittle.values.valuePipeline.createWithoutScope({
        typeConverters: typeConverters,
        stringFormatter: stringFormatter
    });

    var element = {};
    var value = ko.observable(5);
    value._typeAsString = "SometType";

    var result = pipeline.getValueForView(element, value);

    it("should try to convert it", function () {
        expect(typeConverters.convertTo.calledWith(5)).toBe(true);
    });

    it("should not return an observable", function () {
        expect(ko.isObservable(result)).toBe(false);
    });

    it("should return the converted value", function () {
        expect(result).toBe("5");
    });
});

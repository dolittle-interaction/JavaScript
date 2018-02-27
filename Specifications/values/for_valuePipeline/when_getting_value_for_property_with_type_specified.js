﻿describe("when getting value for property with type specified", function () {
    var typeConverters = {
        convertFrom: sinon.stub().returns("42")
    };
    var stringFormatter = {
        hasFormat: sinon.stub().returns(false)
    };

    var pipeline = doLittle.values.valuePipeline.createWithoutScope({
        typeConverters: typeConverters,
        stringFormatter: stringFormatter
    });

    var value = ko.observable(42);
    value._typeAsString = "SomeType";

    var result = pipeline.getValueForProperty(value, value());
    
    it("should try to convert type", function () {
        expect(typeConverters.convertFrom.calledWith(42)).toBe(true);
    });

    it("should return converted value", function () {
        expect(result).toBe("42");
    });
});

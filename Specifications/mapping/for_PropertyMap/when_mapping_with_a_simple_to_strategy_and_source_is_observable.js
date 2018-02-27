﻿describe("when mapping with a simple to strategy and source is observable", function () {
    var propertyMap = doLittle.mapping.PropertyMap.create({
        sourceProperty: "sourceProperty",
        typeConverters: {}
    });

    var source = {
        sourceProperty: ko.observable(42)
    };
    var target = {
        
    };
    
    propertyMap.to("targetProperty");

    propertyMap.map(source, target);

    it("should copy the source property value to the target property", function () {
        expect(target.targetProperty).toBe(42);
    });
});
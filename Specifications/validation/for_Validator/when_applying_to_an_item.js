﻿describe("when applying to an item", function () {
    it("should add a validator", function () {
        var item = {};
        doLittle.validation.Validator.applyTo(item, {});
        expect(item.validator).not.toBeUndefined();
    });
});
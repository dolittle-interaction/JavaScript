﻿describe("when validating with zero decimal", function () {
    var validator = doLittle.validation.notNull.create({ options: {} });
    var result = validator.validate(0.0);

    it("should be valid", function () {
        expect(result).toBe(true);
    });
});
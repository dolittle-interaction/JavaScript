﻿describe("when asking if string is object", function () {

    var result = doLittle.isObject("something");

    it("should not be considered an object", function () {
        expect(result).toBe(false);
    });
    
});
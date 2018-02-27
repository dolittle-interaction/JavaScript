﻿describe("when asking for all mappings and no mappings have been registered", function () {
    var mapper = doLittle.StringMapper.create({
        stringMappingFactory: {}
    });
    it("should return an empty array", function () {
        expect(mapper.mappings.length).toBe(0);
    });
});


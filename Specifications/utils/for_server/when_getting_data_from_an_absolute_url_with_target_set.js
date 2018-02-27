﻿describe("when getting data from an absolute url with target set", function () {
    var url = "http://wwww.db.no/Somewhere/With?query=value";
    var data = { something: 42 };

    var target = "http://www.vg.no";
    var server = doLittle.server.create();
    server.target = target;
    
    beforeEach(function() {
        sinon.stub($, "ajax")
        server.get(url, data);
    });

    afterEach(function() {
        $.ajax.restore();
    });

    it("should get relative to target defined", function () {
        expect($.ajax.firstCall.args[0].url).toBe(url);
    });
});
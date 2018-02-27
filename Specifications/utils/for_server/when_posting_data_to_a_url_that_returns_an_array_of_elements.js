﻿describe("when posting data to a url that returns an array of elements", sinon.test(function () {
    var url = "/Somewhere/With?query=value";
    var fakeServer = sinon.fakeServer.create();
    var data = { something: 42 };
    var response;

    $.support.cors = true;

    fakeServer.respondWith("POST", /\w/, function (xhr) {
        xhr.respond(200, { "Content-Type":"application/json" }, '[{"somethingElse":"43"},{"someStuff":"d44"}]');
    });

    var server = doLittle.server.create();
    var promise = server.post(url, data);
    promise.continueWith(function (result) {
        response = result;
    });

    fakeServer.respond();

    
    it("should deserialize the data coming back", function () {
        expect(response).toEqual([
            { somethingElse: 43 },
            { someStuff: "d44" }
        ]);
    });
}));
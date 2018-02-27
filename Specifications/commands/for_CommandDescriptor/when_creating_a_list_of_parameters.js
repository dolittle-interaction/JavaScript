﻿describe("when creating a list of parameters", function () {
    var command = {
        _name: "DoSomething",
        id: doLittle.Guid.create(),
        plainString: "plainString",
        koString: ko.observable("test"),
        observableWithObservableAsValue: ko.observable(ko.observable(42))
    };
    var commandDescriptor = doLittle.commands.CommandDescriptor.createFrom(command);
    var result = JSON.parse(commandDescriptor.command);

    it("should include the plainString", function () {
        expect(result.plainString).toBe(command.plainString)
    });

    it("should include the koString", function () {
        expect(result.koString).toBe(command.koString());
    });

    it("should include the observable with observable value", function () {
        expect(result.observableWithObservableAsValue).toBe(command.observableWithObservableAsValue()());
    });
});
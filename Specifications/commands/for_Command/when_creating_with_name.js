﻿describe("when creating with name", function () {
    var parameters = {
        commandCoordinator: {
        },
        commandValidationService: {
            extendPropertiesWithoutValidation: sinon.stub(),
            getValidatorsFor: sinon.stub(),
            validateSilently: sinon.stub()
        },
        commandSecurityService: {
            getContextFor: function () {
                return {
                    continueWith: function () { }
                };
            }
        },
        options: {
            name: "something"
        },
        region: {
            commands: []
        },
        mapper: {}
    }
    var command = doLittle.commands.Command.create(parameters);

    it("should set name on the command", function () {
        expect(command._name).toBe("something");
    });
});
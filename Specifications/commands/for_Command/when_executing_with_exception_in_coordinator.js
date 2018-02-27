﻿describe("when executing with exception in coordinator", function () {
    var parameters = {
        options: {
            failed: sinon.stub(),
            succeeded: sinon.stub(),
            completed: sinon.stub()
        },
        commandCoordinator: {
            handle: function () {
                throw "Something";
            }
        },
        commandValidationService: {
            applyRulesTo: function () { },
            validate: function (command) {
                return {
                    valid: true
                };
            },
            validateSilently: sinon.stub()
        },
        commandSecurityService: {
            getContextFor: function () {
                return {
                    continueWith: function () { }
                };
            }
        },
        region: {
            commands: []
        },
        mapper: {}
    }

    var commandResult = null;
    beforeEach(function () {
        commandResult = doLittle.commands.CommandResult;
        doLittle.commands.CommandResult = {
            create: sinon.stub()
        };
    });

    afterEach(function () {
        doLittle.commands.CommandResult = commandResult;
    });

    var command = doLittle.commands.Command.create(parameters);
    command.execute();


    it("should not be busy", function () {
        expect(command.isBusy()).toBe(false);
    });
});
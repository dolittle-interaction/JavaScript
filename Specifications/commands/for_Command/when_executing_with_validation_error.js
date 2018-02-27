﻿describe("when executing with validation error", function () {
    var parameters = {
        options: {
            failed: sinon.stub(),
            succeeded: sinon.stub(),
            completed: sinon.stub()
        },
        commandCoordinator: {
            handle: sinon.stub()
        },
        commandValidationService: {
            applyRulesTo: function () { },
            validate: function (command) {
                return {
                    valid: false
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
    commandResult = doLittle.commands.CommandResult;
    doLittle.commands.CommandResult = {
        create: function () {
            return {

            };
        }
    };
    var command = doLittle.commands.Command.create(parameters);
    command.execute();
    doLittle.commands.CommandResult = commandResult;


    it("should call error", function () {
        expect(parameters.options.failed.called).toBe(true);
    });

    it("should not call the command coordinator", function () {
        expect(parameters.commandCoordinator.handle.called).toBe(false);
    });

    it("should not call success", function () {
        expect(parameters.options.succeeded.called).toBe(false);
    });

    it("should call complete", function () {
        expect(parameters.options.completed.called).toBe(true);
    });
});
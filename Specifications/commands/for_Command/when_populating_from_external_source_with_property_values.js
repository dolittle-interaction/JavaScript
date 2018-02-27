﻿describe("when populating from external source with property values", function () {
    var parameters = {
        commandCoordinator: {
        },
        commandValidationService: {
            applyRulesTo: function (command) {
            },
            validateSilently: sinon.stub(),
            clearValidationMessagesFor: sinon.stub()
        },
        commandSecurityService: {
            getContextFor: function () {
                return {
                    continueWith: function () { }
                };
            }
        },
        options: {
        },
        region: {
            commands: []
        },
        mapper: {
            mapToInstance: sinon.stub().returns(["someValue", "someArray"])
        }
    }

    var commandType = doLittle.commands.Command.extend(function () {
        this.someValue = ko.observable(42);
        this.someArray = ko.observableArray();
    });

    var newValues = {
        someValue: 43,
        someArray: [1, 2, 3]
    };

    var command = commandType.create(parameters);
    command.populateFromExternalSource(newValues);


    it("should forward to mapper", function () {
        expect(parameters.mapper.mapToInstance.calledWith(commandType, newValues, command)).toBe(true);
    });

    it("should be considered populated externally", function () {
        expect(command.isPopulatedExternally()).toBe(true);
    });

    it("should be considered ready", function () {
        expect(command.isReady()).toBe(true);
    });

    it("should clear any validation messages", function () {
        expect(parameters.commandValidationService.clearValidationMessagesFor.calledWith(command)).toBe(true);
    });
    
});
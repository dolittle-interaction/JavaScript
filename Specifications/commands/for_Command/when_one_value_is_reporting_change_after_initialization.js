﻿describe("when one value is reporting change after initialization", function () {
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
        mapper: {}
    }

    var commandType = doLittle.commands.Command.extend(function () {
        this.someValue = ko.observable(43);
        this.someArray = ko.observableArray();
    });

    var hasChangesExtender = ko.extenders.hasChanges;
    ko.extenders.hasChanges = function (target, options) {
        target.hasChanges = ko.observable(false);
        target.setInitialValue = function () { }
    };

    var command = commandType.create(parameters);
    command.someValue.hasChanges(true);

    ko.extenders.hasChanges = hasChangesExtender;

    it("should have changes", function () {
        expect(command.hasChanges()).toBe(true);
    });
});
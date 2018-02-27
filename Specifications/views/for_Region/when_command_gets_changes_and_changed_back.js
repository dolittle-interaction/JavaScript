﻿describe("when command gets changes and changed back", function () {

    var tasks = {
        all: ko.observableArray()
    };

    var messengerFactory = {
        create: function () { },
        global: function () { }
    };
    var operationsFactory = {
        create: function () {
            return {
                all: ko.observableArray(),
                stateful: ko.observableArray()
            }
        }
    };
    var tasksFactory = {
        create: function () {
            return tasks;
        }
    };

    var region = new doLittle.views.Region(
        messengerFactory,
        operationsFactory,
        tasksFactory
    );
    var hasChanges = false;
    region.hasChanges.subscribe(function (newValue) {
        hasChanges = newValue;
    });

    var command = {
        isValid: ko.observable(false),
        isAuthorized: ko.observable(false),
        canExecute: ko.observable(false),
        hasChanges: ko.observable(false),
        isReadyToExecute: ko.observable(false),
        validators: ko.observableArray()
    };

    region.commands.push(command);

    command.hasChanges(true);
    command.hasChanges(false);

    it("should not have changes", function () {
        expect(hasChanges).toBe(false);
    });
});
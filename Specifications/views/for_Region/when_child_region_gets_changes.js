﻿describe("when child region gets changes", function () {

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

    var childRegion = {
        isLoading: ko.observable(false),
        isBusy: ko.observable(false),
        isValid: ko.observable(false),
        isComposing: ko.observable(false),
        isExecuting: ko.observable(false),
        isCommandRoot: ko.observable(false),
        validationMessages: ko.observableArray(),
        aggregatedCommands: ko.observableArray(),
        canCommandsExecute: ko.observable(false),
        areCommandsAuthorized: ko.observable(false),
        commandsHaveChanges: ko.observable(false),
        areCommandsReadyToExecute: ko.observable(false),
        hasChanges: ko.observable(false)
    };

    region.children.push(childRegion);
    childRegion.hasChanges(true);

    it("should have changes", function () {
        expect(hasChanges).toBe(true);
    });
});
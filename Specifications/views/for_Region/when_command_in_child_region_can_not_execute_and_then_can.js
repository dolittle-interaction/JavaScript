﻿describe("when command in child region can not execute and then can", function () {
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
    var canExecute = null;
    region.canCommandsExecute.subscribe(function (newValue) {
        canExecute = newValue;
    });


    var childRegion = new doLittle.views.Region(
        messengerFactory,
        operationsFactory,
        tasksFactory
    );
    region.children.push(childRegion);

    var command = {
        isValid: ko.observable(false),
        isAuthorized: ko.observable(false),
        canExecute: ko.observable(false),
        hasChanges: ko.observable(false),
        isReadyToExecute: ko.observable(false),
        validators: ko.observableArray()
    };

    region.commands.push(command);

    command.canExecute(true);

    it("should be able to execute", function () {
        expect(canExecute).toBe(true);
    });
});
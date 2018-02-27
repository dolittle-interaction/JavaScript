﻿describe("when executing task that successfully finishes", function () {
    var result = { some: "result" };
    var successfulCallback = null;
    var task = {
        isExecuting: ko.observable(false),
        execute: sinon.stub().returns({
            continueWith: function (callback) {
                successfulCallback = callback;
                return this;
            },
            onFail: function () {
                return this;
            }
        })
    };


    var taskHistoryId = "someId";
    var taskHistory = {
        begin: sinon.mock().withArgs(task).returns(taskHistoryId),
        end: sinon.mock().withArgs(taskHistoryId, result)
    };

    var tasks = doLittle.tasks.Tasks.create({ taskHistory: taskHistory });

    var isBusyTimeline = [];
    var taskWasAdded = false;
    
    tasks.all.subscribe(function (newValue) {
        if (newValue[0] == task) taskWasAdded = true;
    });

    tasks.isBusy.subscribe(function (newValue) {
        isBusyTimeline.push(newValue);
    });

    var continueWithMock = sinon.mock().withArgs(result);
    var promise = tasks.execute(task).continueWith(continueWithMock);

    successfulCallback(result);

    it("should add the task to all", function () {
        expect(taskWasAdded).toBe(true);
    });

    it("should remove the task when done", function () {
        expect(tasks.all().length).toBe(0);
    });

    it("should execute the task", function () {
        expect(task.execute.called).toBe(true);
    });

    it("should begin the task history", function () {
        expect(taskHistory.begin.called).toBe(true);
    });

    it("should end the task history", function () {
        expect(taskHistory.end.called).toBe(true);
    });

    it("should set the busy flag to true first", function () {
        expect(isBusyTimeline[0]).toBe(true);
    });

    it("should set the busy flag to false last", function () {
        expect(isBusyTimeline[1]).toBe(false);
    });

    it("should signal the promise with the result", function () {
        expect(continueWithMock.called).toBe(true);
    });
});
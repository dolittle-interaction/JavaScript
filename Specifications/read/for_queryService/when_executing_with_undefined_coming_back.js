﻿describe("when executing with undefined coming back", function() {
    var task = {
        some: "task"
    };
    var tasks = {
        execute: sinon.mock().withArgs(task).returns({
            continueWith: function (callback) {
                callback(null);
            }
        })
    };
    var query = {
        _name: "Its a query",
        _generatedFrom: "Something",
        getParameterValues: function () { return {}; },
        hasReadModel: function () { return false; },
        region: {
            tasks: tasks
        }
    };

    var mapper = {};
    var taskFactory = {
        createQuery: function (url, payload) {
            return task;
        }
    };
    var instance = doLittle.read.queryService.createWithoutScope({
        taskFactory: taskFactory,
        mapper: mapper
    });

    var paging = {
        size: 2,
        number: 5
    };

    var result = null;

    instance.execute(query, paging).continueWith(function (data) {
        result = data;
    });

    it("should create a default result with empty items to the promise", function () {
        expect(result).toEqual({
            items: [],
            totalItems: 0
        });
    });
});

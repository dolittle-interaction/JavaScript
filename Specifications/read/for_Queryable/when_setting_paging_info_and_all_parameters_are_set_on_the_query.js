﻿describe("when setting paging info and all parameters are set on the query", function () {

    var query = {
        someProperty: ko.observable(),
        areAllParametersSet: function () {
            return true;
        }
    };
    var paging = {
        size: 0,
        number: 0
    };

    var pagingInfoType = null;

    var queryService = null;
    var region = {};

    beforeEach(function () {
        pagingInfoType = doLittle.read.PagingInfo;

        doLittle.read.PagingInfo = {
            create: function () {
                return paging;
            }
        };

        queryService = {
            execute: sinon.mock().withArgs(query, paging).once()
        };

        var instance = doLittle.read.Queryable.create({
            query: query,
            region: region,
            queryService: queryService,
            targetObservable: {}
        });

        instance.setPageInfo(2, 5);
    });

    afterEach(function () {
        doLittle.read.PagingInfo = pagingInfoType;
    });


    it("should execute the query on the query service", function () {
        expect(queryService.execute.verify()).toBe(true);
    });
});
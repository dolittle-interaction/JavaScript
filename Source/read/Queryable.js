Dolittle.namespace("Dolittle.read", {
    Queryable: Dolittle.Type.extend(function (query, queryService, region, targetObservable) {
        var self = this;

        this.canExecute = true;

        this.target = targetObservable;
        this.query = query;
        this.queryService = queryService;
        this.pageSize = ko.observable(0);
        this.pageNumber = ko.observable(0);
        this.totalItems = ko.observable(0);
        this.completedCallbacks = [];

        this.pageSize.subscribe(function () {
            if (self.canExecute) {
                self.execute();
            }
        });

        this.pageNumber.subscribe(function () {
            if (self.canExecute) {
                self.execute();
            }
        });

        function observePropertiesFrom(query) {
            for (var propertyName in query) {
                var property = query[propertyName];
                if (ko.isObservable(property) === true && query.hasOwnProperty(propertyName) && propertyName !== "areAllParametersSet") {
                    property.subscribe(self.execute);
                }
            }
        }

        this.completed = function (callback) {
            self.completedCallbacks.push(callback);
            return self;
        };

        this.onCompleted = function (data) {
            self.completedCallbacks.forEach(function (callback) {
                callback(data);
            });
        };

        this.execute = function () {
            if (self.query.areAllParametersSet() !== true) {
                // TODO: Diagnostics - warning
                return self.target;
            }
            self.query._previousAreAllParametersSet = true;

            var paging = Dolittle.read.PagingInfo.create({
                size: self.pageSize(),
                number: self.pageNumber()
            });
            self.queryService.execute(query, paging).continueWith(function (result) {
                self.totalItems(result.totalItems);
                self.target(result.items);
                self.onCompleted(result.items);
            });

            return self.target;
        };

        this.setPageInfo = function (pageSize, pageNumber) {
            
            if (pageSize === self.pageSize() && pageNumber === self.pageNumber()) {
                return;
            }
            
            self.canExecute = false;
            self.pageSize(pageSize);
            self.pageNumber(pageNumber);
            self.canExecute = true;
            self.execute();
        };
        
        observePropertiesFrom(self.query);

        if (self.query.areAllParametersSet()) {
            self.execute();
        }
      
    })
});
Dolittle.read.Queryable.new = function (options, region) {
    var observable = ko.observableArray();
    options.targetObservable = observable;
    options.region = region;
    var queryable = Dolittle.read.Queryable.create(options);
    Dolittle.extend(observable, queryable);
    observable.isQueryable = true;
    return observable;
};
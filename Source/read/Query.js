﻿doLittle.namespace("doLittle.read", {
    Query: doLittle.Type.extend(function (queryableFactory, region) {
        var self = this;
        this.target = this;

        this._name = "";
        this._generatedFrom = "";
        this._readModel = null;
        this.region = region;

        this.areAllParametersSet = null;

        this.hasReadModel = function () {
            return typeof self.target._readModel !== "undefined" && self.target._readModel != null;
        };

        this.setParameters = function (parameters) {
            try {
                for (var property in parameters) {
                    if (self.target.hasOwnProperty(property) && ko.isObservable(self.target[property]) === true) {
                        self.target[property](parameters[property]);
                    }
                }
            } catch(ex) {}
        };

        this.getParameters = function () {
            var parameters = {};

            for (var property in self.target) {
                if (ko.isObservable(self.target[property]) &&
                    property !== "areAllParametersSet") {
                    parameters[property] = self.target[property];
                }
            }

            return parameters;
        };

        this.getParameterValues = function () {
            var parameterValues = {};
            var value;

            var parameters = self.getParameters();
            for (var property in parameters) {
                value = parameters[property]();
                if (ko.isObservable(value)) {
                    value = value();
                }
                parameterValues[property] = value;
            }

            return parameterValues;
        };

        this.all = function () {
            var queryable = queryableFactory.create(self.target, region);
            return queryable;
        };

        this.paged = function (pageSize, pageNumber) {
            var queryable = queryableFactory.create(self.target, region);
            queryable.setPageInfo(pageSize, pageNumber);
            return queryable;
        };

        this.onCreated = function (query) {
            self.target = query;

            for (var property in self.target) {
                if (ko.isObservable(self.target[property]) === true) {
                    self.target[property].extend({ linked: {} });
                }
            }
            
            self.areAllParametersSet = ko.computed(function () {
                var isSet = true;
                var hasParameters = false;
                for (var property in self.target) {
                    if (ko.isObservable(self.target[property]) === true) {
                        hasParameters = true;
                        var value = ko.unwrap(self.target[property]());
                        if (typeof value === "undefined" || value === null) {
                            isSet = false;
                            break;
                        }
                    }
                }
                if (hasParameters === false) {
                    return true;
                }
                return isSet;
            });
        };
    })
});
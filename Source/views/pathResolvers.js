﻿doLittle.namespace("doLittle.views", {
    pathResolvers: doLittle.Singleton(function () {

        function getResolvers() {
            var resolvers = [];
            for (var property in doLittle.views.pathResolvers) {
                if (doLittle.views.pathResolvers.hasOwnProperty(property)) {
                    var value = doLittle.views.pathResolvers[property];
                    if( typeof value === "function" &&
                        typeof value.create === "function") {

                        var resolver = value.create();
                        if (typeof resolver.canResolve === "function") {
                            resolvers.push(resolver);
                        }
                    }
                }
            }
            return resolvers;
        }


        this.canResolve = function (element, path) {
            var resolvers = getResolvers();
            for (var resolverIndex = 0; resolverIndex < resolvers.length; resolverIndex++) {
                var resolver = resolvers[resolverIndex];
                var result = resolver.canResolve(element, path);
                if (result === true) {
                    return true;
                }
            }
            return false;
        };

        this.resolve = function (element, path) {
            var resolvers = getResolvers();
            for (var resolverIndex = 0; resolverIndex < resolvers.length; resolverIndex++) {
                var resolver = resolvers[resolverIndex];
                if (resolver.canResolve(element, path)) {
                    return resolver.resolve(element, path);
                }
            }
            return null;
        };
    })
});
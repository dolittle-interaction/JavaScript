﻿doLittle.dependencyResolvers.Region = {
    canResolve: function (namespace, name) {
        return name === "region";
    },

    resolve: function (namespace, name) {
        return doLittle.views.Region.current;
    }
};
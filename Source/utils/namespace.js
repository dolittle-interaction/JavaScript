var doLittle = doLittle || {};
doLittle.namespace = function (ns, content) {

    // Todo: this should not be needed, it is a symptom of something using it being wrong!!! Se issue #232 on GitHub (http://github.com/dolittle/doLittle/issues/232)
    ns = ns.replaceAll("..", ".");
    if (ns.endsWith(".")) {
        ns = ns.substr(0, ns.length - 1);
    }
    if (ns.startsWith(".")) {
        ns = ns.substr(1);
    }

    var parent = window;
    var name = "";
    var parts = ns.split('.');
    parts.forEach(function (part) {
        if (name.length > 0) {
            name += ".";
        }
        name += part;
        if (!Object.prototype.hasOwnProperty.call(parent, part)) {
            parent[part] = {};
            parent[part].parent = parent;
            parent[part].name = name;
        }
        parent = parent[part];
    });

    if (typeof content === "object") {
        doLittle.namespace.current = parent;

        var property;

        for (property in content) {
            parent[property] = content[property];
        }

        for (property in parent) {
            if (parent.hasOwnProperty(property)) {
                parent[property]._namespace = parent;
                parent[property]._name = property;
            }
        }
        doLittle.namespace.current = null;
    }

    return parent;
};
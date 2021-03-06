Dolittle.namespace("Dolittle.markup", {
    Control: Dolittle.markup.UIElement.extend(function () {
        var self = this;
        this.template = null;

        this.prepare = function (type, element) {
            var promise = Dolittle.execution.Promise.create();

            var file = type._namespace._path + type._name + ".html";
            require(["text!" + file + "!strip"], function (v) {
                var container = document.createElement("div");
                container.innerHTML = v;
                self.template = container;

                promise.signal();
            });

            return promise;
        };
    })
});
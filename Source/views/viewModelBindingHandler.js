doLittle.namespace("doLittle.views", {
    viewModelBindingHandler: doLittle.Type.extend(function(documentService, viewFactory, viewModelLoader, viewModelManager, viewModelTypes, regionManager) {
        this.init = function (element, valueAccessor, allBindingsAccessor, parentViewModel, bindingContext) {
            var path = ko.utils.unwrapObservable(valueAccessor());
            if (element._isLoading === true || (element._viewModelPath === path && !doLittle.isNullOrUndefined(element._viewModel))) {
                return;
            }

            element._isLoading = true;
            element._viewModelPath = path;

            var viewPath = "/";

            if( documentService.hasViewFile(element) ) {
                viewPath = documentService.getViewFileFrom(element);
            }

            var view = viewFactory.createFrom(viewPath);
            view.content = element.innerHTML;
            view.element = element;

            var viewModelInstance = ko.observable();

            var region = regionManager.getFor(view);
            regionManager.describe(view,region).continueWith(function () {
                var viewModelParameters = allBindingsAccessor().viewModelParameters || {};
                viewModelParameters.region = region;

                if (viewModelTypes.isLoaded(path)) {
                    var viewModelType = viewModelTypes.getViewModelTypeForPath(path);

                    var lastRegion = doLittle.views.Region.current;
                    doLittle.views.Region.current = region;

                    viewModelType.beginCreate(viewModelParameters).continueWith(function (viewModel) {
                        var childBindingContext = bindingContext.createChildContext(viewModel);
                        childBindingContext.$root = viewModel;
                        element._viewModel = viewModel;

                        viewModelInstance(viewModel);
                        doLittle.views.Region.current = lastRegion;

                        element._isLoading = false;
                    }).onFail(function(e) {
                        console.log("Could not create an instance of '" + viewModelType._namespace.name + "." + viewModelType._name+" - Reason : "+e);
                    });
                } else {
                    viewModelLoader.load(path, region, viewModelParameters).continueWith(function (viewModel) {
                        var childBindingContext = bindingContext.createChildContext(viewModel);
                        childBindingContext.$root = viewModel;
                        element._viewModel = viewModel;

                        viewModelInstance(viewModel);

                        element._isLoading = false;
                    });
                }
            });

            return ko.bindingHandlers.with.init(element, viewModelInstance, allBindingsAccessor, parentViewModel, bindingContext);
        };
    })
});
doLittle.views.viewModelBindingHandler.initialize = function () {
    ko.bindingHandlers.viewModel = doLittle.views.viewModelBindingHandler.create();
};


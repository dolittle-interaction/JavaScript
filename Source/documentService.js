﻿doLittle.namespace("doLittle",{
    documentService: doLittle.Singleton(function (DOMRoot) {
        var self = this;

        this.DOMRoot = DOMRoot;

        this.pageHasViewModel = function (viewModel) {
            var context = ko.contextFor($("body")[0]);
            if (doLittle.isUndefined(context)) {
                return false;
            }
            return context.$data === viewModel;
        };

        this.getViewModelNameFor = function (element) {
            var dataViewModelName = element.attributes.getNamedItem("data-viewmodel-name");
            if (doLittle.isNullOrUndefined(dataViewModelName)) {
                dataViewModelName = document.createAttribute("data-viewmodel-name");
                dataViewModelName.value = doLittle.Guid.create();
            }
            element.attributes.setNamedItem(dataViewModelName);
            return dataViewModelName.value;
        };

        this.setViewModelParametersOn = function (element, parameters) {
            element.viewModelParameters = parameters;
        };

        this.getViewModelParametersFrom = function (element) {
            return element.viewModelParameters;
        };

        this.hasViewModelParameters = function (element) {
            return !doLittle.isNullOrUndefined(element.viewModelParameters);
        };

        this.cleanChildrenOf = function (element) {
            self.traverseObjects(function (child) {
                if (child !== element) {
                    $(child).unbind();
                    ko.cleanNode(child);
                }
            }, element);
        };

        this.hasViewFile = function (element) {
            var attribute = element.attributes["data-view-file"];
            return !doLittle.isNullOrUndefined(attribute);
        };

        this.getViewFileFrom = function (element) {
            if (self.hasViewFile(element)) {
                var attribute = element.attributes["data-view-file"];
                return attribute.value;
            }
            return null;
        };


        this.hasOwnRegion = function (element) {
            /// <summary>Check if element has its own region</summary>
            /// <param name="element" type="HTMLElement">HTML Element to check</param>
            /// <returns>true if it has its own region, false it not</returns>

            if (element.region) {
                return true;
            }
            return false;
        };

        this.getParentRegionFor = function (element) {
            /// <summary>Get the parent region for a given element</summary>
            /// <param name="element" type="HTMLElement">HTML Element to get for</param>
            /// <returns>An instance of the region, if no region is found it will return null</returns>
            var found = null;

            while (element.parentNode) {
                element = element.parentNode;
                if (element.region) {
                    return element.region;
                }
            }

            return found;
        };

        this.getRegionFor = function (element) {
            /// <summary>Get region for an element, either directly or implicitly through the nearest parent, null if none</summary>
            /// <param name="element" type="HTMLElement">HTML Element to get for</param>
            /// <returns>An instance of the region, if no region is found it will return null</returns>
            var found = null;

            if (element.region) {
                return element.region;
            }
            found = self.getParentRegionFor(element);
            return found;
        };

        this.setRegionOn = function (element, region) {
            /// <summary>Set region on a specific element</summary>
            /// <param name="element" type="HTMLElement">HTML Element to set on</param>
            /// <param name="region" type="doLittle.views.Region">Region to set on element</param>

            element.region = region;
        };

        this.clearRegionOn = function (element) {
            /// <summary>Clear region on a specific element</summary>
            /// <param name="element" type="HTMLElement">HTML Element to set on</param>
            element.region = null;
        };

        this.traverseObjects = function(callback, element) {
            /// <summary>Traverse objects and call back for each element</summary>
            /// <param name="callback" type="Function">Callback to call for each element found</param>
            /// <param name="element" type="HTMLElement" optional="true">Optional root element</param>
            element = element || self.DOMRoot;
            if (!doLittle.isNullOrUndefined(element)) {
                callback(element);

                if( element.hasChildNodes() ) {
                    var child = element.firstChild;
                    while (child) {
                        var nextSibling = child.nextSibling;
                        if( child.nodeType === 1 ) {
                            self.traverseObjects(callback, child);
                        }
                        child = nextSibling;
                    }
                }
            }
        };

        this.getUniqueStyleName = function(prefix) {
            var id = doLittle.Guid.create();
            var name = prefix+"_"+id;
            return name;
        };

        this.addStyle = function(selector, style) {
            /// <summary>Add a style dynamically into the browser</summary>
            /// <param name="selector" type="String">Selector that represents the class</param>
            /// <param name="style" type="Object">Key/value pair object for styles</param>
            if(!document.styleSheets) {
                return;
            }
            var i;
            var styleString = "";
            for( var property in style ) {
                styleString = styleString + property +":" + style[property]+";";
            }
            style = styleString;

            if(document.getElementsByTagName("head").length === 0) {
                return;
            }

            var styleSheet;
            var media;
            var mediaType;
            if(document.styleSheets.length > 0) {
                for( i = 0; i < document.styleSheets.length; i++) {
                    if(document.styleSheets[i].disabled) {
                        continue;
                    }
                    media = document.styleSheets[i].media;
                    mediaType = typeof media;

                    if(mediaType === "string") {
                        if(media === "" || (media.indexOf("screen") !== -1)) {
                            styleSheet = document.styleSheets[i];
                        }
                    } else if(mediaType === "object") {
                        if(media.mediaText === "" || (media.mediaText.indexOf("screen") !== -1)) {
                            styleSheet = document.styleSheets[i];
                        }
                    }

                    if( typeof styleSheet !== "undefined") {
                        break;
                    }
                }
            }

            if( typeof styleSheet === "undefined") {
                var styleSheetElement = document.createElement("style");
                styleSheetElement.type = "text/css";

                document.getElementsByTagName("head")[0].appendChild(styleSheetElement);

                for( i = 0; i < document.styleSheets.length; i++) {
                    if(document.styleSheets[i].disabled) {
                        continue;
                    }
                    styleSheet = document.styleSheets[i];
                }

                media = styleSheet.media;
                mediaType = typeof media;
            }

            if(mediaType === "string") {
                for( i = 0; i < styleSheet.rules.length; i++) {
                    if(styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase() === selector.toLowerCase()) {
                        styleSheet.rules[i].style.cssText = style;
                        return;
                    }
                }

                styleSheet.addRule(selector, style);
            } else if(mediaType === "object") {
                for( i = 0; i < styleSheet.cssRules.length; i++) {
                    if(styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() === selector.toLowerCase()) {
                        styleSheet.cssRules[i].style.cssText = style;
                        return;
                    }
                }

                styleSheet.insertRule(selector + "{" + style + "}", 0);
            }
        };
    })
});
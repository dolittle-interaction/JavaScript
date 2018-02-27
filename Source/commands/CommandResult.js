doLittle.namespace("doLittle.commands");
doLittle.commands.CommandResult = (function () {
    function CommandResult(existing) {
        var self = this;
        this.isEmpty = function () {
            return self.commandId === doLittle.Guid.empty;
        };

        this.commandName = "";
        this.commandId = doLittle.Guid.empty;
        this.validationResults = [];
        this.success = true;
        this.invalid = false;
        this.passedSecurity = true;
        this.exception = undefined;
        this.exceptionMessage = "";
        this.commandValidationMessages = [];
        this.securityMessages = [];
        this.allValidationMessages = [];
        this.details = "";

        if (typeof existing !== "undefined") {
            doLittle.extend(this, existing);
        }
    }

    return {
        create: function() {
            var commandResult = new CommandResult();
            return commandResult;
        },
        createFrom: function (result) {
            var existing = typeof result === "string" ? JSON.parse(result) : result;
            var commandResult = new CommandResult(existing);
            return commandResult;
        }
    };
})();
var webPackConfig = require("./webpack.config");
var concat = require("concat");
concat(webPackConfig.entry, "dolittle.js");
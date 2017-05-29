var App;
(function (App) {
    var Services;
    (function (Services) {
        var Util;
        (function (Util) {
            "use strict";
            var LogService = (function () {
                function LogService($log, toastr) {
                    this.$log = $log;
                    this.toastr = toastr;
                }
                LogService.prototype.warning = function (message, title) {
                    this.toastr.warning(message, title);
                    this.$log.warn(message, title);
                };
                LogService.prototype.info = function (message, title) {
                    this.toastr.info(message, title);
                    this.$log.info(message, title);
                };
                LogService.prototype.error = function (message, title) {
                    this.toastr.error(message, title);
                    this.$log.error(message, title);
                };
                LogService.prototype.success = function (message, title) {
                    this.toastr.success(message, title);
                    this.$log.log(message, title);
                };
                return LogService;
            }());
            LogService.$inject = ['$log', 'toastr'];
            Util.LogService = LogService;
            angular.module(App.Config.MODULE_NAME).service('LogService', LogService);
        })(Util = Services.Util || (Services.Util = {}));
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=log.service.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var App;
(function (App) {
    var Services;
    (function (Services) {
        var Http;
        (function (Http) {
            "use strict";
            var JobsDataService = (function (_super) {
                __extends(JobsDataService, _super);
                function JobsDataService($http, $q) {
                    return _super.call(this, 'jobs', $http, $q) || this;
                }
                JobsDataService.prototype.search = function (text) {
                    return _super.prototype.get.call(this, "search", "?text=" + text);
                };
                return JobsDataService;
            }(Http.Base.HttpService));
            JobsDataService.$inject = ['$http', '$q'];
            Http.JobsDataService = JobsDataService;
            angular.module(App.Config.MODULE_NAME).service('JobsDataService', JobsDataService);
        })(Http = Services.Http || (Services.Http = {}));
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=jobs.data-service.js.map
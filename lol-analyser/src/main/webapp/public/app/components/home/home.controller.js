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
    var Components;
    (function (Components) {
        var Home;
        (function (Home) {
            var HomeController = (function (_super) {
                __extends(HomeController, _super);
                function HomeController($localStorage, $location, logService, jobsDataService) {
                    var _this = _super.call(this) || this;
                    _this.$localStorage = $localStorage;
                    _this.$location = $location;
                    _this.logService = logService;
                    _this.jobsDataService = jobsDataService;
                    return _this;
                }
                HomeController.prototype.submit = function () {
                    var _this = this;
                    this.jobsDataService.search(this.text).then(function (data) {
                        _this.result = data;
                    }, function (error) {
                        _this.logService.error(error);
                    });
                };
                return HomeController;
            }(Components.BaseController));
            HomeController.$inject = ['$localStorage', '$location', 'LogService', 'JobsDataService'];
            Home.HomeController = HomeController;
            angular.module(App.Config.MODULE_NAME).controller('HomeController', HomeController);
        })(Home = Components.Home || (Components.Home = {}));
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
//# sourceMappingURL=home.controller.js.map
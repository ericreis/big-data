var App;
(function (App) {
    var Services;
    (function (Services) {
        var Http;
        (function (Http) {
            var Base;
            (function (Base) {
                var HttpService = (function () {
                    function HttpService(controllerName, $http, $q, blockUI) {
                        this.$http = $http;
                        this.$q = $q;
                        this.blockUI = blockUI;
                        this.baseServiceUrl = App.Config.API_URL + "/api/" + controllerName;
                    }
                    HttpService.prototype.getCleanStringParameters = function (stringParameters) {
                        if (stringParameters && stringParameters.length > 0) {
                            return stringParameters;
                        }
                        return '';
                    };
                    HttpService.prototype.getUrl = function (actionUrl, stringParameters) {
                        return this.baseServiceUrl + '/' + actionUrl + this.getCleanStringParameters(stringParameters);
                    };
                    HttpService.prototype.get = function (actionUrl, stringParameters, dontUseExceptionHandling) {
                        var _this = this;
                        this.blockUI.start();
                        var defer = this.$q.defer();
                        var url = this.getUrl(actionUrl, stringParameters);
                        this.$http.get(url).then(function (data) {
                            defer.resolve(data.data);
                            _this.blockUI.stop();
                        }, function (error) {
                            defer.reject(error);
                            _this.blockUI.stop();
                        });
                        return defer.promise;
                    };
                    HttpService.prototype.post = function (actionUrl, data, dontUseExceptionHandling) {
                        var _this = this;
                        this.blockUI.start();
                        var defer = this.$q.defer();
                        var url = this.getUrl(actionUrl);
                        this.$http.post(url, data).then(function (data) {
                            defer.resolve(data.data);
                            _this.blockUI.stop();
                        }, function (error) {
                            defer.reject(error);
                            _this.blockUI.stop();
                        });
                        return defer.promise;
                    };
                    return HttpService;
                }());
                Base.HttpService = HttpService;
            })(Base = Http.Base || (Http.Base = {}));
        })(Http = Services.Http || (Services.Http = {}));
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=http.service.js.map
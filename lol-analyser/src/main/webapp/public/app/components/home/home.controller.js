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
                function HomeController($scope, $localStorage, $location, logService, jobsDataService) {
                    var _this = _super.call(this) || this;
                    _this.$scope = $scope;
                    _this.$localStorage = $localStorage;
                    _this.$location = $location;
                    _this.logService = logService;
                    _this.jobsDataService = jobsDataService;
                    _this.searchResult = {
                        results: [],
                        searchedItems: []
                    };
                    _this.dynamicSeries = _this.searchResult.searchedItems.filter(function (value, index, array) {
                        return value.active;
                    }).map(function (value, index, array) {
                        return {
                            valueField: value.text + "Count",
                            name: "Occurrences of term \"" + value.text + "\""
                        };
                    });
                    _this.chartOptions = {
                        palette: "violet",
                        dataSource: _this.searchResult.results,
                        commonSeriesSettings: {
                            argumentField: "date"
                        },
                        bindingOptions: {
                            "commonSeriesSettings.type": "line",
                            series: "homeCtrl.dynamicSeries",
                        },
                        margin: {
                            bottom: 20
                        },
                        argumentAxis: {
                            valueMarginsEnabled: false,
                            discreteAxisDivisionMode: "crossLabels",
                            grid: {
                                visible: true
                            }
                        },
                        legend: {
                            verticalAlignment: "bottom",
                            horizontalAlignment: "center",
                            itemTextPosition: "bottom"
                        },
                        title: {
                            text: "Occurrences of terms",
                        },
                        "export": {
                            enabled: true
                        },
                        tooltip: {
                            enabled: true,
                            customizeTooltip: function (arg) {
                                return {
                                    text: arg.valueText
                                };
                            }
                        }
                    };
                    return _this;
                }
                HomeController.prototype.addSearchText = function () {
                    var _this = this;
                    if (this.indexOfProperty(this.searchResult.searchedItems, "text", this.text) != -1) {
                        this.logService.warning("Text already searched...");
                        return;
                    }
                    this.jobsDataService.searchGrouped(this.text).then(function (data) {
                        _this.searchResult.searchedItems.push({
                            text: _this.text,
                            active: true
                        });
                        data.forEach(function (value, index, array) {
                            var idx = _this.indexOfProperty(_this.searchResult.results, "dateStr", value["_1"]);
                            if (idx == -1) {
                                _this.searchResult.results.push({
                                    searchedText: _this.text,
                                    active: true,
                                    dateStr: value["_1"],
                                    date: new Date(value["_1"]),
                                });
                                _this.searchResult.results[_this.searchResult.results.length - 1][_this.text + "Count"] = value["_2"]["count"];
                            }
                            else {
                                _this.searchResult.results[idx][_this.text + "Count"] = value["_2"]["count"];
                            }
                        });
                        _this.dynamicSeries = _this.searchResult.searchedItems.filter(function (value, index, array) {
                            return value.active;
                        }).map(function (value, index, array) {
                            return {
                                valueField: value.text + "Count",
                                name: "Occurrences of term \"" + value.text + "\""
                            };
                        });
                    }, function (error) {
                        _this.logService.error(error);
                    });
                };
                HomeController.prototype.removeSearchText = function (searchedText) {
                    var idx = this.indexOfProperty(this.searchResult.searchedItems, "text", searchedText);
                    if (idx != -1) {
                        this.searchResult.searchedItems.splice(idx, 1);
                    }
                };
                HomeController.prototype.onCheckboxClick = function () {
                    this.dynamicSeries = this.searchResult.searchedItems.filter(function (value, index, array) {
                        return value.active;
                    }).map(function (value, index, array) {
                        return {
                            valueField: value.text + "Count",
                            name: "Occurrences of term \"" + value.text + "\""
                        };
                    });
                };
                HomeController.prototype.indexOfProperty = function (arr, prop, value) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i][prop] == value) {
                            return i;
                        }
                    }
                    return -1;
                };
                return HomeController;
            }(Components.BaseController));
            HomeController.$inject = ['$scope', '$localStorage', '$location', 'LogService', 'JobsDataService'];
            Home.HomeController = HomeController;
            angular.module(App.Config.MODULE_NAME).controller('HomeController', HomeController);
        })(Home = Components.Home || (Components.Home = {}));
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
//# sourceMappingURL=home.controller.js.map
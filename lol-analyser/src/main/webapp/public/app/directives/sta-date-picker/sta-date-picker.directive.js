var App;
(function (App) {
    var Directives;
    (function (Directives) {
        var STADatePicker;
        (function (STADatePicker) {
            var STADatePickerDirective = (function () {
                function STADatePickerDirective() {
                    var _this = this;
                    this.gridOption = {
                        restrict: 'EA',
                        scope: {
                            ngModel: '='
                        },
                        templateUrl: 'public/app/directives/sta-date-picker/sta-date-picker.html',
                        controller: App.Directives.STADatePicker.STADatePickerController,
                        controllerAs: 'staDatePickerCtrl'
                    };
                    this.directive = function () {
                        return _this.gridOption;
                    };
                }
                STADatePickerDirective.factory = function () {
                    var directive = new STADatePickerDirective();
                    return directive.directive;
                };
                return STADatePickerDirective;
            }());
            STADatePickerDirective.$inject = [];
            STADatePicker.STADatePickerDirective = STADatePickerDirective;
            angular.module(App.Config.MODULE_NAME).directive('staDatePicker', STADatePickerDirective.factory());
        })(STADatePicker = Directives.STADatePicker || (Directives.STADatePicker = {}));
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=sta-date-picker.directive.js.map
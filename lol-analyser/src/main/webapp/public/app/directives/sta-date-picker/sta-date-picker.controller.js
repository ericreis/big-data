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
    var Directives;
    (function (Directives) {
        var STADatePicker;
        (function (STADatePicker) {
            var STADatePickerController = (function (_super) {
                __extends(STADatePickerController, _super);
                function STADatePickerController($scope) {
                    var _this = _super.call(this) || this;
                    _this.$scope = $scope;
                    _this.init();
                    return _this;
                }
                STADatePickerController.prototype.init = function () {
                    this.dateBoxOptions = {
                        type: 'date',
                        displayFormat: 'dd/MM/yyyy',
                        bindingOptions: {
                            value: 'ngModel'
                        }
                    };
                };
                return STADatePickerController;
            }(App.Components.BaseController));
            STADatePickerController.$inject = ['$scope'];
            STADatePicker.STADatePickerController = STADatePickerController;
            angular.module(App.Config.MODULE_NAME).controller('STADatePickerController', STADatePickerController);
        })(STADatePicker = Directives.STADatePicker || (Directives.STADatePicker = {}));
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=sta-date-picker.controller.js.map
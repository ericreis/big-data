namespace App.Directives.STADatePicker {

    import dxDateBoxOptions = DevExpress.ui.dxDateBoxOptions;

    export class STADatePickerController extends App.Components.BaseController {

        public dateBoxOptions : dxDateBoxOptions;

        public static $inject: string[] = ['$scope'];

        constructor(private $scope: any) {
            super();

            this.init();
        }

        private init() {
            this.dateBoxOptions = {
                type: 'date',
                displayFormat: 'dd/MM/yyyy',
                bindingOptions: {
                    value: 'ngModel'
                }
            }
        }

    }

    angular.module(App.Config.MODULE_NAME).controller('STADatePickerController', STADatePickerController);
}
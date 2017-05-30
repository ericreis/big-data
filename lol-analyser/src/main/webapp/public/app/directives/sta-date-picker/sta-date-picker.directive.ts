namespace App.Directives.STADatePicker {

    export class STADatePickerDirective implements ng.IDirective {

        public gridOption: any;
        public directive: any;

        public static $inject: string[] = [];

        constructor() {

            this.gridOption = {
                restrict: 'EA',
                scope: {
                    ngModel: '='
                },
                templateUrl: 'public/app/directives/sta-date-picker/sta-date-picker.html',
                controller: App.Directives.STADatePicker.STADatePickerController,
                controllerAs: 'staDatePickerCtrl'
            };

            this.directive = () => {
                return this.gridOption;
            }

        }

        public static factory() : ng.IDirectiveFactory {
            const directive = new STADatePickerDirective();
            return directive.directive;
        }


    }

    angular.module(App.Config.MODULE_NAME).directive('staDatePicker', STADatePickerDirective.factory());
}
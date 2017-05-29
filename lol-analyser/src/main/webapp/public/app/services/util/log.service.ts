namespace App.Services.Util {
    "use strict";
    import IToastrService = angular.toastr.IToastrService;
    import ILogService = angular.ILogService;

    export class LogService {

        public static $inject: string[] = ['$log', 'toastr'];

        constructor(private $log: ILogService, private toastr: IToastrService) {

        }

        public warning(message: string, title?: string) {
            this.toastr.warning(message, title);
            this.$log.warn(message, title);
        }

        public info(message: string, title?: string) {
            this.toastr.info(message, title);
            this.$log.info(message, title);
        }

        public error(message: string, title?: string) {
            this.toastr.error(message, title);
            this.$log.error(message, title);
        }

        public success(message: string, title?: string) {
            this.toastr.success(message, title);
            this.$log.log(message, title);
        }
    }

    angular.module(App.Config.MODULE_NAME).service('LogService', LogService);

}
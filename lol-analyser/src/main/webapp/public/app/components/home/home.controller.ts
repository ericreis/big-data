namespace App.Components.Home {

	import LogService = App.Services.Util.LogService;
	import JobsDataService = App.Services.Http.JobsDataService;

    export class HomeController extends BaseController {

        public text: string;
        public result: any;

		public static $inject: string[] = ['$localStorage', '$location', 'LogService', 'JobsDataService'];

		constructor(private $localStorage : angular.storage.IStorageService,
                    private $location : ng.ILocationService,
                    private logService: LogService,
					private jobsDataService: JobsDataService) {
			super();

		}

		public submit() {
			this.jobsDataService.search(this.text).then(
				(data) => {
					this.result = data;
				},
				(error) => {
					this.logService.error(error);
				}
			)
		}

	}

	angular.module(App.Config.MODULE_NAME).controller('HomeController', HomeController);
}
namespace App.Services.Http {
    "use strict";

    export class JobsDataService extends Base.HttpService {

        public static $inject = ['$http', '$q', 'blockUI'];

        public constructor($http: ng.IHttpService,
                           $q: ng.IQService,
                           blockUI) {
            super('jobs', $http, $q, blockUI);
        }

        public search(text: string): ng.IPromise<any> {
            return super.get("search", `?text=${text}`);
        }

        public searchGrouped(text: string): ng.IPromise<any> {
            return super.get("searchGrouped", `?text=${text}`);
        }
    }

    angular.module(App.Config.MODULE_NAME).service('JobsDataService', JobsDataService);
}
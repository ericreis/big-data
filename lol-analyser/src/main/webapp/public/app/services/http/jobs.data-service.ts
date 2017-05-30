namespace App.Services.Http {
    "use strict";

    export class JobsDataService extends Base.HttpService {

        public static $inject = ['$http', '$q'];

        public constructor($http: ng.IHttpService,
                           $q: ng.IQService) {
            super('jobs', $http, $q);
        }

        public search(text: string): ng.IPromise<any> {
            return super.get("search", `?text=${text}`);
        }

    }

    angular.module(App.Config.MODULE_NAME).service('JobsDataService', JobsDataService);
}
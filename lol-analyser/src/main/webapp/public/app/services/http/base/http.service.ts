namespace App.Services.Http.Base {

    export class HttpService {

        private baseServiceUrl: string;

        public constructor(controllerName: string,
                           protected $http: ng.IHttpService,
                           protected $q: ng.IQService,
                           private blockUI) {
            this.baseServiceUrl = App.Config.API_URL + "/api/" + controllerName;
        }

        private getCleanStringParameters(stringParameters: string): string {
            if (stringParameters && stringParameters.length > 0) {
                return stringParameters;
            }

            return '';
        }

        private getUrl(actionUrl: string, stringParameters?: string): string {
            return this.baseServiceUrl + '/' + actionUrl + this.getCleanStringParameters(stringParameters);
        }

        protected get(actionUrl: string, stringParameters?: string, dontUseExceptionHandling?: boolean) {
            this.blockUI.start();
            var defer = this.$q.defer();

            var url = this.getUrl(actionUrl, stringParameters);

            this.$http.get(url).then(
                (data) => {
                    defer.resolve(data.data);
                    this.blockUI.stop();
                },
                (error) => {
                    defer.reject(error);
                    this.blockUI.stop();
                });

            return defer.promise;
        }

        protected post(actionUrl: string, data: any, dontUseExceptionHandling?: boolean) {
            this.blockUI.start();
            var defer = this.$q.defer();

            var url = this.getUrl(actionUrl);

            this.$http.post(url, data).then(
                (data) => {
                    defer.resolve(data.data);
                    this.blockUI.stop();
                },
                (error) => {
                    defer.reject(error);
                    this.blockUI.stop();
                });

            return defer.promise;
        }
    }
}

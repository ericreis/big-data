(function () {
    "use strict";
    routeConfig.$inject = ['$routeProvider'];
    angular.module(App.Config.MODULE_NAME).config(routeConfig);
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'public/app/components/home/home.html',
            controller: App.Components.Home.HomeController,
            controllerAs: 'homeCtrl'
        })
            .otherwise({
            redirectTo: '/'
        });
    }
})();
//# sourceMappingURL=app.config.js.map
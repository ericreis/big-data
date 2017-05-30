(() => {

	angular.module(App.Config.MODULE_NAME, [
		'ngRoute',
		'ui.bootstrap',
		'ngStorage',
		'toastr',
        'ngSanitize',
		'dx',
		'ngMessages'
	]);
	
})();
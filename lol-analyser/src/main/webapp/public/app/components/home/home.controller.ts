namespace App.Components.Home {

    export class HomeController extends BaseController {

        public text: string;

        public searchResult: App.Interfaces.ISearchResult;

        public chartOptions: any;
        public dynamicSeries: any;

		public static $inject: string[] = ['$scope', '$localStorage', '$location', 'LogService', 'JobsDataService'];

		constructor(private $scope: ng.IScope,
					private $localStorage : angular.storage.IStorageService,
                    private $location : ng.ILocationService,
                    private logService: App.Services.Util.LogService,
					private jobsDataService: App.Services.Http.JobsDataService) {
			super();

			this.searchResult = <App.Interfaces.ISearchResult> {
				results: [],
				searchedItems: []
			};

			this.dynamicSeries = this.searchResult.searchedItems.filter((value, index, array) => {
				return value.active;
			}).map((value, index, array) => {
				return {
					valueField: value.text + "Count",
					name: `Occurrences of term \"${value.text}\"`
				}
			});

			this.chartOptions = {
				palette: "violet",
				dataSource: this.searchResult.results,
				commonSeriesSettings: {
					argumentField: "date"
				},
				bindingOptions: {
					"commonSeriesSettings.type": "line",
					series: "homeCtrl.dynamicSeries",
				},
				margin: {
					bottom: 20
				},
				argumentAxis: {
					valueMarginsEnabled: false,
					discreteAxisDivisionMode: "crossLabels",
					grid: {
						visible: true
					}
				},
				legend: {
					verticalAlignment: "bottom",
					horizontalAlignment: "center",
					itemTextPosition: "bottom"
				},
				title: {
					text: "Occurrences of terms",
				},
				"export": {
					enabled: true
				},
				tooltip: {
					enabled: true,
					customizeTooltip: function (arg) {
						return {
							text: arg.valueText
						};
					}
				}
			};
		}

		public addSearchText() {
			if (this.indexOfProperty(this.searchResult.searchedItems, "text", this.text) != -1) {
				this.logService.warning("Text already searched...");
				return;
			}

			this.jobsDataService.searchGrouped(this.text).then(
				(data) => {
					this.searchResult.searchedItems.push({
						text: this.text,
						active: true
					});
					data.forEach((value, index, array) => {
						var idx: number = this.indexOfProperty(this.searchResult.results, "dateStr", value["_1"]);
						if (idx == -1) {
							this.searchResult.results.push({
								searchedText: this.text,
								active: true,
								dateStr: value["_1"],
								date: new Date(value["_1"]),
							});
							this.searchResult.results[this.searchResult.results.length - 1][this.text + "Count"] = value["_2"]["count"];
						}
						else {
							this.searchResult.results[idx][this.text + "Count"] = value["_2"]["count"];
						}
					});

					this.dynamicSeries = this.searchResult.searchedItems.filter((value, index, array) => {
						return value.active;
					}).map((value, index, array) => {
						return {
							valueField: value.text + "Count",
							name: `Occurrences of term \"${value.text}\"`
						}
					});
				},
				(error) => {
					this.logService.error(error);
				}
			);
		}

		public removeSearchText(searchedText: string) {
			var idx: number = this.indexOfProperty(this.searchResult.searchedItems, "text", searchedText);
			if (idx != -1) {
				this.searchResult.searchedItems.splice(idx, 1);
			}
		}

		public onCheckboxClick() {
			this.dynamicSeries = this.searchResult.searchedItems.filter((value, index, array) => {
				return value.active;
			}).map((value, index, array) => {
				return {
					valueField: value.text + "Count",
					name: `Occurrences of term \"${value.text}\"`
				}
			});
		}

		private indexOfProperty(arr: any[], prop: string, value: any): number {
			for (var i: number = 0; i < arr.length; i++) {
				if (arr[i][prop] == value) {
					return i;
				}
			}
			return -1;
		}

	}

	angular.module(App.Config.MODULE_NAME).controller('HomeController', HomeController);
}
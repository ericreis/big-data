namespace App.Directives.STADxGrid {

    export class STADxGridDirective implements ng.IDirective {

        public gridOption: any;
        public directive: any;

        public static $inject: string[] = [];

        constructor() {

            this.gridOption = {
                restrict: 'EA',
                scope: {
                    fieldList: '=',
                    columnList: '=',
                    grouping: '@',
                    filtering: '@',
                    selectionMode: '@',
                    selectionChanged: '=',
                    multipleSelect: '@',
                    autoExpand: '=',
                    pageSize: '@',
                    editing: '=',
                    rowUpdated: '=',
                    exportEnabled: '=',
                    exportFileName: '@',
                    rowClick: '=',
                    rowPrepared: '=',
                    insert: '=',
                    remove: '=',
                    pagerEnabled: '@',
                    pageSizeSelectorEnabled: '@',
                    selectedRowKeys: '=',
                    showExportBtn: '@',
                    dragAndDropFunction: '=',
                    wordWrapEnabled: '@',
                    hideTotal: '=',
                    onRowInserting: '=',
                    onRowUpdating: '=',
                    editMode: '@',
                    gridId: '@',
                    isCustomStore: '@',
                    totalCount: '=',
                    summary: '=',
                    columnFixing: '@',
                    applyFilter: '@',
                    onExportedFunction: '=',
                },
                templateUrl: 'public/app/directives/sta-dx-grid/sta-dx-grid.html',
                controller: App.Directives.STADxGrid.STADxGridController,
                controllerAs: 'staDxGridCtrl'
            };

            this.directive = () => {
                return this.gridOption;
            }

        }

        public static factory() : ng.IDirectiveFactory {
            const directive = new STADxGridDirective();
            return directive.directive;
        }


    }

    angular.module(App.Config.MODULE_NAME).directive('staDxGrid', STADxGridDirective.factory());
}
var App;
(function (App) {
    var Directives;
    (function (Directives) {
        var STADxGrid;
        (function (STADxGrid) {
            var STADxGridDirective = (function () {
                function STADxGridDirective() {
                    var _this = this;
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
                    this.directive = function () {
                        return _this.gridOption;
                    };
                }
                STADxGridDirective.factory = function () {
                    var directive = new STADxGridDirective();
                    return directive.directive;
                };
                return STADxGridDirective;
            }());
            STADxGridDirective.$inject = [];
            STADxGrid.STADxGridDirective = STADxGridDirective;
            angular.module(App.Config.MODULE_NAME).directive('staDxGrid', STADxGridDirective.factory());
        })(STADxGrid = Directives.STADxGrid || (Directives.STADxGrid = {}));
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=sta-dx-grid.directive.js.map
namespace App.Directives.STADxGrid {

    export class STADxGridController extends App.Components.BaseController {

        private gridId: any;
        private gridFieldOptions: any;
        private hideTotal: boolean;
        private total: number;

        private grid: DevExpress.ui.dxDataGrid;

        public static $inject: string[] = ['$compile', '$scope'];

        constructor(private $compile : ng.ICompileProvider, private $scope: App.Interfaces.Util.IDataGridScope) {
            super();

            this.columnsSettings();

            this.init();
        }

        private columnsSettings() {
            for (var i in this.$scope.columnList) {
                var column = this.$scope.columnList[i];

                if (!angular.isDefined(column.dataType)) {
                    column.dataType = "string";
                }

                if (column.isDeleteCommand) {
                    var cellTemplate = function (container, options) {
                        $('<i/>')
                            .addClass("fa")
                            .addClass("fa-trash-o")
                            .addClass("cursor-pointer")
                            .on('dxclick', function () { options.column.deleteFunction(options.data) })
                            .appendTo(container);
                    };

                    column.cellTemplate = cellTemplate;
                    column.width = 70;
                    column.alignment = 'center';
                }

                if (column.isEditCommand) {
                    var cellTemplate = function (container, options) {
                        $('<i/>')
                            .addClass("fa")
                            .addClass("fa-pencil-square-o")
                            .addClass("cursor-pointer")
                            .on('dxclick', function () { options.column.editFunction(options.data) })
                            .appendTo(container);
                    };

                    if (column.addFunction) {
                        var headerCellTemplate = function (header, info) {
                            $('<i />')
                                .addClass("fa")
                                .addClass("fa-plus")
                                .addClass("cursor-pointer")
                                .addClass("add-button")
                                .appendTo(header);
                            header.parent().on("dxclick", function () { info.column.addFunction() });
                        };

                        column.headerCellTemplate = headerCellTemplate;
                    }

                    column.cellTemplate = cellTemplate;
                    column.width = 70;
                    column.alignment = 'center';
                }

                if (column.isLink) {
                    var cellTemplate = function (container, options) {
                        $('<a/>')
                            .addClass("cursor-pointer")
                            .text(options.data[options.column.dataField])
                            .on('dxclick', function () { options.column.linkFunction(options.data) })
                            .appendTo(container);
                    };

                    column.cellTemplate = cellTemplate;
                }

                if (column.isImage) {
                    var cellTemplate = function (container, options) {

                        var icon = $('<i />')
                            .addClass("fa fa-file-image-o");
                        var element = $('<sta-image-viewer/>')
                            .addClass("btn btn-info")
                            .attr("title", options.column.caption)
                            .attr("image", options.data[options.column.dataField])
                            .append(icon);

                        element = this.$compile(element[0])(this.$scope);

                        element.appendTo(container);
                    };

                    column.cellTemplate = cellTemplate;
                    column.alignment = 'center';
                }

                if (column.isTabela) {
                    var cellTemplate = function (container, options) {

                        if (options.data[options.column.dataField] != undefined) {
                            var newScope = this.$scope.$new(true);

                            newScope.fieldList = options.data[options.column.dataField];

                            var icon = $('<i />')
                                .addClass("fa fa-file-image-o");
                            var element = $('<sta-table-field-viewer />')
                                .addClass("btn btn-info")
                                .attr("title", options.column.caption)
                                .attr("field-list", "fieldList")
                                .append(icon);

                            element = this.$compile(element[0])(newScope);

                            element.appendTo(container);
                        }
                    };

                    column.cellTemplate = cellTemplate;
                    column.alignment = 'center';
                }
            }
        }

        private init() {

            var pageSize = 10;
            var grouping = false;
            var filtering = false;
            var multipleSelect = false;
            var multipleSelectOption = 'single';
            var exportFileName = 'DxDataGrid';
            var autoExpand = false;
            var selectionChanged = this.$scope.selectionChanged;
            var rowClick = this.$scope.rowClick;
            var rowPrepared = this.$scope.rowPrepared;
            var selectedRowKeys = this.$scope.selectedRowKeys || [];
            var editing = false;
            var pagerEnabled = true;
            var rowUpdated = this.$scope.rowUpdated;
            var exportEnabled = false;
            var insert = false;
            var remove = false;
            var pageSizeSelectorEnabled = true;
            var showExportBtn = false;
            var enableDragAndDrop = false;
            var wordWrapEnabled = false;
            var editMode = "batch";
            var onRowInserting = this.$scope.onRowInserting;
            var onRowUpdating = this.$scope.onRowUpdating;
            var isCustomStore = false;
            var columnFixing = false;
            var summary = {};
            var applyFilter = "auto";
            var onExportedFunction = this.$scope.onExportedFunction;

            if (angular.isDefined(this.$scope.dragAndDropFunction)) {
                enableDragAndDrop = true;
            }

            if (angular.isDefined(this.$scope.grouping)) {
                grouping = this.$scope.grouping == "true";
            }

            if (angular.isDefined(this.$scope.filtering)) {
                filtering = this.$scope.filtering == "true";
            }

            if (angular.isDefined(this.$scope.autoExpand)) {
                autoExpand = this.$scope.autoExpand === true;
            }

            if (angular.isDefined(this.$scope.editing)) {
                editing = this.$scope.editing == true;
            }

            if (angular.isDefined(this.$scope.insert)) {
                insert = this.$scope.insert === true;
            }

            if (angular.isDefined(this.$scope.remove)) {
                remove = this.$scope.remove === true;
            }

            if (angular.isDefined(this.$scope.pagerEnabled)) {
                pagerEnabled = this.$scope.pagerEnabled == "true";
            }

            if (angular.isDefined(this.$scope.pageSizeSelectorEnabled)) {
                pageSizeSelectorEnabled = this.$scope.pageSizeSelectorEnabled == "true";
            }

            if (angular.isDefined(this.$scope.pageSize)) {
                pageSize = parseInt(this.$scope.pageSize);
            }

            if (angular.isDefined(this.$scope.multipleSelect)) {
                multipleSelect = this.$scope.multipleSelect == "true";
                if (multipleSelect) {
                    multipleSelectOption = 'multiple';
                }
            }

            if (angular.isDefined(this.$scope.showExportBtn)) {
                showExportBtn = this.$scope.showExportBtn == "true";
            }

            if (angular.isDefined(this.$scope.wordWrapEnabled)) {
                wordWrapEnabled = this.$scope.wordWrapEnabled == "true";
            }

            if (angular.isDefined(this.$scope.exportEnabled)) {
                exportEnabled = this.$scope.exportEnabled == true;
            }

            if (angular.isDefined(this.$scope.exportFileName)) {
                exportFileName = this.$scope.exportFileName;
            }

            if (angular.isDefined(this.$scope.editMode)) {
                editMode = this.$scope.editMode;
            }

            if (angular.isDefined(this.$scope.isCustomStore)) {
                isCustomStore = this.$scope.isCustomStore == "true";
            }

            if (angular.isDefined(this.$scope.columnFixing)) {
                columnFixing = this.$scope.columnFixing == "true";
            }

            if (angular.isDefined(this.$scope.summary)) {
                summary = this.$scope.summary;
            }

            if (angular.isDefined(this.$scope.applyFilter)) {
                applyFilter = this.$scope.applyFilter;
            }

            this.gridId = this.$scope.gridId;
            this.gridFieldOptions = {
                scrolling: { mode: 'standard' },
                selection: {
                    mode: multipleSelectOption
                },
                groupPanel: { visible: grouping },
                grouping: { autoExpandAll: autoExpand },
                filterRow: {
                    visible: filtering,
                    applyFilter: applyFilter
                },
                columnFixing: {
                    enabled: columnFixing
                },
                height: 'auto',
                paging: { pageSize: pageSize },
                pager: {
                    visible: pagerEnabled,
                    showPageSizeSelector: pageSizeSelectorEnabled,
                    allowedPageSizes: [5, 10, 20]
                },
                editing: {
                    mode: editMode,
                    allowUpdating: editing,
                    allowAdding: insert,
                    allowDeleting: remove
                },
                allowColumnResizing: true,
                hoverStateEnabled: true,
                bindingOptions: {
                    dataSource: 'fieldList',
                    columns: 'columnList'
                },
                columnAutoWidth: true,
                selectionChanged: selectionChanged,
                selectedRowKeys: selectedRowKeys,
                rowUpdated: rowUpdated,
                'export': {
                    enabled: exportEnabled,
                    texts: {
                        //excelFormat: 'XLSX',
                        exportTo: 'Exportar',
                        exportAll: 'Exportar XLSX',
                        exportSelectedRows: 'Linhas Selecionadas'
                    },
                    fileName: exportFileName
                },
                onExported: onExportedFunction,
                onRowClick: rowClick,
                rowPrepared: (rowElement, rowInfo) => {
                    if (angular.isDefined(this.$scope.rowPrepared))
                        rowPrepared(rowElement, rowInfo);
                    if (enableDragAndDrop) {
                        if (rowInfo.rowType != 'data')
                            return;
                        rowElement
                            .addClass('myRow')
                            .data('keyValue', rowInfo.key);
                    }
                },
                contentReadyAction: (e) => {
                    if (enableDragAndDrop) {
                        this.$scope.dragAndDropFunction(e.element);
                    }
                },
                wordWrapEnabled: wordWrapEnabled,
                onRowInserting: onRowInserting,
                onRowUpdating: onRowUpdating,
                summary: summary,
            };
            this.hideTotal = this.$scope.hideTotal;

            this.$scope.$watch('fieldList', (newValue, oldValue) => {
                if (!isCustomStore) {
                    if (newValue !== undefined) {
                        // this.$scope.total = this.$scope.fieldList.length;
                        this.total = this.$scope.fieldList.length;
                    } else {
                        // this.$scope.total = 0;
                        this.total = 0;
                    }
                }
            }, true);

            this.$scope.$watch('totalCount', (newValue, oldValue) => {
                if (this.$scope.totalCount !== undefined) {
                    // this.$scope.total = this.$scope.totalCount;
                    this.total = this.$scope.totalCount;
                }
            }, true);

            this.$scope.$watch('columnList', (newValue, oldValue) => {
                if (newValue !== undefined && newValue !== oldValue) {
                    this.columnsSettings();
                }
            }, true);
        }

        public exportDataToCsv () {
            return this.$scope.fieldList;
        }

        public getCsvHeader () {
            var cols = [];
            for (var i in this.$scope.columnList) {
                var col = this.$scope.columnList[i];
                if (angular.isDefined(col.caption)) {
                    cols.push(col.caption);
                }
                else {
                    cols.push(col.dataField);
                }
            }
            return cols;
        }
    }

    angular.module(App.Config.MODULE_NAME).controller('STADxGridController', STADxGridController);
}
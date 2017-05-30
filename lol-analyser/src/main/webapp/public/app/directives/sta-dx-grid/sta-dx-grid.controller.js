var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var App;
(function (App) {
    var Directives;
    (function (Directives) {
        var STADxGrid;
        (function (STADxGrid) {
            var STADxGridController = (function (_super) {
                __extends(STADxGridController, _super);
                function STADxGridController($compile, $scope) {
                    var _this = _super.call(this) || this;
                    _this.$compile = $compile;
                    _this.$scope = $scope;
                    _this.columnsSettings();
                    _this.init();
                    return _this;
                }
                STADxGridController.prototype.columnsSettings = function () {
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
                                    .on('dxclick', function () { options.column.deleteFunction(options.data); })
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
                                    .on('dxclick', function () { options.column.editFunction(options.data); })
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
                                    header.parent().on("dxclick", function () { info.column.addFunction(); });
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
                                    .on('dxclick', function () { options.column.linkFunction(options.data); })
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
                };
                STADxGridController.prototype.init = function () {
                    var _this = this;
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
                                exportTo: 'Exportar',
                                exportAll: 'Exportar XLSX',
                                exportSelectedRows: 'Linhas Selecionadas'
                            },
                            fileName: exportFileName
                        },
                        onExported: onExportedFunction,
                        onRowClick: rowClick,
                        rowPrepared: function (rowElement, rowInfo) {
                            if (angular.isDefined(_this.$scope.rowPrepared))
                                rowPrepared(rowElement, rowInfo);
                            if (enableDragAndDrop) {
                                if (rowInfo.rowType != 'data')
                                    return;
                                rowElement
                                    .addClass('myRow')
                                    .data('keyValue', rowInfo.key);
                            }
                        },
                        contentReadyAction: function (e) {
                            if (enableDragAndDrop) {
                                _this.$scope.dragAndDropFunction(e.element);
                            }
                        },
                        wordWrapEnabled: wordWrapEnabled,
                        onRowInserting: onRowInserting,
                        onRowUpdating: onRowUpdating,
                        summary: summary,
                    };
                    this.hideTotal = this.$scope.hideTotal;
                    this.$scope.$watch('fieldList', function (newValue, oldValue) {
                        if (!isCustomStore) {
                            if (newValue !== undefined) {
                                _this.total = _this.$scope.fieldList.length;
                            }
                            else {
                                _this.total = 0;
                            }
                        }
                    }, true);
                    this.$scope.$watch('totalCount', function (newValue, oldValue) {
                        if (_this.$scope.totalCount !== undefined) {
                            _this.total = _this.$scope.totalCount;
                        }
                    }, true);
                    this.$scope.$watch('columnList', function (newValue, oldValue) {
                        if (newValue !== undefined && newValue !== oldValue) {
                            _this.columnsSettings();
                        }
                    }, true);
                };
                STADxGridController.prototype.exportDataToCsv = function () {
                    return this.$scope.fieldList;
                };
                STADxGridController.prototype.getCsvHeader = function () {
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
                };
                return STADxGridController;
            }(App.Components.BaseController));
            STADxGridController.$inject = ['$compile', '$scope'];
            STADxGrid.STADxGridController = STADxGridController;
            angular.module(App.Config.MODULE_NAME).controller('STADxGridController', STADxGridController);
        })(STADxGrid = Directives.STADxGrid || (Directives.STADxGrid = {}));
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
//# sourceMappingURL=sta-dx-grid.controller.js.map
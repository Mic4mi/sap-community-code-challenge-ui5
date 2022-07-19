sap.ui.define(
    [
        "ui5/challenge/controller/BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast",
        "sap/ui/Device",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/Sorter",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
        Controller,
        JSONModel,
        MessageToast,
        Device,
        Filter,
        FilterOperator,
        Sorter
    ) {
        "use strict";

        return Controller.extend("ui5.challenge.controller.Main", {
            _defaultData: [
                {
                    "ProductId": "HT-1000",
                    "Category": "LT",
                    "MainCategory": "Computer Systems",
                    "SupplierName": "Very Best Screens",
                    "Weight": "4.2",
                    "WeightUnit": "KG",
                    "ShortDescription": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                    "Name": "Notebook Basic 15",
                    "PictureUrl": "sap/ui/demo/mock/images/HT-1000.jpg",
                    "Status": "A",
                    "Price": "956",
                    "DimensionWidth": "30",
                    "DimensionDepth": "18",
                    "DimensionHeight": "3",
                    "Unit": "cm",
                    "CurrencyCode": "EUR"
                },
                {
                    "ProductId": "HT-1001",
                    "Category": "LT",
                    "MainCategory": "Computer Systems",
                    "SupplierName": "Very Best Screens",
                    "Weight": "4.5",
                    "WeightUnit": "KG",
                    "ShortDescription": "Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                    "Name": "Notebook Basic 17",
                    "PictureUrl": "sap/ui/demo/mock/images/HT-1001.jpg",
                    "Status": "A",
                    "Price": "1249",
                    "DimensionWidth": "29",
                    "DimensionDepth": "17",
                    "DimensionHeight": "3.1",
                    "Unit": "cm",
                    "CurrencyCode": "EUR"
                },
                {
                    "ProductId": "HT-1002",
                    "Category": "LT",
                    "MainCategory": "Computer Systems",
                    "SupplierName": "Very Best Screens",
                    "Weight": "4.2",
                    "WeightUnit": "KG",
                    "ShortDescription": "Notebook Basic 18 with 2,80 GHz quad core, 18\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
                    "Name": "Notebook Basic 18",
                    "PictureUrl": "sap/ui/demo/mock/images/HT-1002.jpg",
                    "Status": "A",
                    "Price": "1570",
                    "DimensionWidth": "28",
                    "DimensionDepth": "19",
                    "DimensionHeight": "2.5",
                    "Unit": "cm",
                    "CurrencyCode": "EUR"
                },
                {
                    "ProductId": "HT-1003",
                    "Category": "LT",
                    "MainCategory": "Computer Systems",
                    "SupplierName": "Smartcards",
                    "Weight": "4.2",
                    "WeightUnit": "KG",
                    "ShortDescription": "Notebook Basic 19 with 2,80 GHz quad core, 19\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
                    "Name": "Notebook Basic 19",
                    "PictureUrl": "sap/ui/demo/mock/images/HT-1003.jpg",
                    "Status": "A",
                    "Price": "1650",
                    "DimensionWidth": "32",
                    "DimensionDepth": "21",
                    "DimensionHeight": "4",
                    "Unit": "cm",
                    "CurrencyCode": "EUR"
                },
            ],

            onInit: function () {
                const oDefaultModel = new JSONModel(this._defaultData);
                this.getView().setModel(oDefaultModel, "mainModel");
            },

            onDoSomething: function (oEvent) {
                MessageToast.show("I do nothing (yet)");
            },

            onNavigateToDetail: function (oEvent) {
                let oItem = oEvent.getSource(),
                    bReplace = !Device.system.phone;
                this.navTo("Detail", {}, bReplace);
            },

            /**
           * Applies the controller filters to a certain component, such as a table or list
           * @param {sap.m.table} oTable 
           * @param {Array} aFilters 
           */
            onFilterChange: function (oTable, aFilters) {
                let oBinding = oTable.getBinding("items"),
                    oFilter;

                if (aFilters) {
                    oFilter = new Filter(aFilters, true);
                    oBinding.filter(oFilter, "Application");
                }
            },

            /**
             * 
             * Obtain all filters from this view
             */
            getFilters: function () {
                let aFilters = [];

                if (this.oSearchProduct) {
                    aFilters.push(this.oSearchProduct);
                }

                return aFilters;
            },

            /**
             * Generates a filter for a search field
             * @param {string} sField 
             * @param {string} sQuery 
             * @param {sap.ui.model.FilterOperator} oFilterOperator 
             */
            getSearchFilter: function (sField, sQuery, oFilterOperator) {
                let oFilter;
                if (sQuery) {
                    oFilter = new Filter(sField, oFilterOperator, sQuery);
                } else {
                    oFilter = null;
                }
                return oFilter;
            },

            /**
             * Create a filter for the ShipName field
             * @param {sap.ui.base.Event} oEvent 
             */
            onSearchProduct: function (oEvent) {
                this.oSearchProduct = this.getSearchFilter(
                    "Name",
                    oEvent.getSource().getValue(),
                    FilterOperator.Contains
                );
                this.onFilterChange(this.byId("idProductsTable"), this.getFilters());
            },
        });
    }
);

/**
 * Created by l.stylianou on 26/08/2016.
 */

sap.ui.define(
    ["sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "testsapui5/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"],
    function(Controller,JSONModel,formatter,Filter,FilterOperator){
        "use strict";

        return Controller.extend("testsapui5.controller.InvoiceList",{
            formatter: formatter,
            onInit : function(){
                var oViewModel = new JSONModel({
                   currency: 'EUR'
                });
                this.getView().setModel(oViewModel,"view");
            },
            //filter on demand
            onFilterInvoices: function(oEvent){
                //build filter array
                var aFilter = [];
                var sQuery = oEvent.getParameter("query");
                if (sQuery){
                    aFilter.push(new Filter("ProductName",FilterOperator.Contains,sQuery));
                }

                //filter binding
                var oList = this.getView().byId("invoiceList");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            },
            //live filtering while the user types the search query
            onLiveFilterInvoices: function(oEvent){
                var aFilter = [];
                var searchField = this.getView().byId("searchField");
                var sQuery = searchField.getProperty("value");
                if (sQuery){
                    aFilter.push(new Filter("ProductName",FilterOperator.Contains,sQuery));
                }

                //filter binding
                var oList = this.getView().byId("invoiceList");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            },
            onPress : function(oEvent){
                var oItem = oEvent.getSource();

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var encodedURI = encodeURIComponent(oItem.getBindingContext("invoice").getPath());
                oRouter.navTo("detail",{
                    invoicePath: encodedURI
                });
            }
        });
    }
);
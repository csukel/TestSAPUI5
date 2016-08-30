sap.ui.define(
    ["sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"],
    function(Controller,MessageToast,JSONModel,ResourceModel){
        "use strict";
        return Controller.extend("testsapui5.controller.App",{

/*            onInit : function(){
              //set data model on view
                var oData = {
                    recipient : {
                        name: "World"
                    }
                };
                
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);

                var i18nModel = new ResourceModel({
                   bundleName : "testsapui5.i18n.i18n"
                });
                this.getView().setModel(i18nModel,"i18n");
            },*/

            onOpenDialog : function(){
                this.getOwnerComponent().helloDialog.open(this.getView());
            }
        });
    }
);
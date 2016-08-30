/**
 * Created by l.stylianou on 24/08/2016.
 */
sap.ui.define(
    ["sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "testsapui5/controller/HelloDialog"],
    function(UIComponent, JSONModel,ResourceModel,HelloDialog){
        "use strict";

        return UIComponent.extend('testsapui5.Component',{
           metadata : {
             /*rootView : "testsapui5.view.App"*/
               manifest: "json"
           },

            init : function(){
               //call the init function of the parent
               UIComponent.prototype.init.apply(this,arguments);

                // set data model
                var oData = {
                    recipient : {
                        name : "World"
                    }
                };
                var oModel = new JSONModel(oData);
                this.setModel(oModel);

                //set dialog
                this.helloDialog = new HelloDialog();

                //create the views based on the url/hash
                this.getRouter().initialize();
/*
                // set i18n model
                var i18nModel = new ResourceModel({
                    bundleName : "testsapui5.i18n.i18n"
                });
                this.setModel(i18nModel, "i18n");*/
           }
        });
    }
);
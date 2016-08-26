/**
 * Created by l.stylianou on 26/08/2016.
 */
sap.ui.define(
    ["sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"],
    function(Controller,MessageToast){
        "use strict";
        return Controller.extend("testsapui5.controller.HelloPanel",{
           init:function(){

           },
            onClick: function() {
                // read msg from i18n model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);
                // show message
                MessageToast.show(sMsg);

            }
        });
    }
);
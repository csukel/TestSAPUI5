/**
 * Created by l.stylianou on 26/08/2016.
 */
sap.ui.define(
    [],
    function(){
        "use strict";
        return {
            statusText : function(sStatus){
                var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
                switch (sStatus){
                    case "A":
                        return resourceBundle.getText("invoiceStatusA");
                    case "B":
                        return resourceBundle.getText("invoiceStatusB");
                    case "C":
                        return resourceBundle.getText("invoiceStatusC");
                    default:
                        return sStatus;
                }
            }
        };
    }
);
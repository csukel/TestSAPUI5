/**
 * Created by l.stylianou on 26/08/2016.
 */
sap.ui.define(
    ["sap/ui/base/Object"],
    function(Object){
        "use strict";
        return Object.extend("testsapui5.controller.HelloDialog",{
            _getDialog : function(){
                if (!this._oDialog){
                    this._oDialog = sap.ui.xmlfragment("testsapui5.view.HelloDialog",this);
                }
                return this._oDialog;
            },
            open : function (oView){
                var oDialog = this._getDialog();
                //connect dialog to view (models ,lifecycle)
                oView.addDependent(oDialog);
                //open dialog
                oDialog.open();
            },
            onCloseDialog :function(){
                this._getDialog().close();
            }
        });
    }
);
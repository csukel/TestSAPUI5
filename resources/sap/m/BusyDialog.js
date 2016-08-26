/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C,P,a){"use strict";var B=C.extend("sap.m.BusyDialog",{metadata:{library:"sap.m",properties:{text:{type:"string",group:"Appearance",defaultValue:''},title:{type:"string",group:"Appearance",defaultValue:''},customIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},customIconRotationSpeed:{type:"int",group:"Appearance",defaultValue:1000},customIconDensityAware:{type:"boolean",defaultValue:true},customIconWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"44px"},customIconHeight:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"44px"},cancelButtonText:{type:"string",group:"Misc",defaultValue:''},showCancelButton:{type:"boolean",group:"Appearance",defaultValue:false}},events:{close:{parameters:{cancelPressed:{type:"boolean"}}}}},renderer:function(r,c){}});B.prototype.init=function(){this._busyIndicator=new sap.m.BusyIndicator(this.getId()+'-busyInd',{visible:true});this._oDialog=new sap.m.Dialog(this.getId()+'-Dialog',{content:this._busyIndicator,showHeader:false,initialFocus:this._busyIndicator}).addStyleClass('sapMBusyDialog');this._oDialog.addEventDelegate({onBeforeRendering:function(){var t=this.getText();var b=this.getTitle();var s=this.getShowCancelButton()||this.getCancelButtonText();if(!t&&!b&&!s){this._oDialog.addStyleClass('sapMBusyDialog-Light');}else{this._oDialog.removeStyleClass('sapMBusyDialog-Light');}}},this);this._oDialog.oPopup.onsapescape=function(e){this.close(true);}.bind(this);};B.prototype.exit=function(){this._busyIndicator.destroy();this._busyIndicator=null;if(this._cancelButton){this._cancelButton.destroy();this._cancelButton=null;}if(this._oLabel){this._oLabel.destroy();this._oLabel=null;}this._oDialog.destroy();this._oDialog=null;};B.prototype.open=function(){q.sap.log.debug("sap.m.BusyDialog.open called at "+new Date().getTime());if(!document.body||!sap.ui.getCore().isInitialized()){setTimeout(function(){this.open();}.bind(this),50);}else{this._oDialog.open();}return this;};B.prototype.close=function(i){this.fireClose({cancelPressed:i||false});this._oDialog.close();};B.prototype.setTitle=function(t){this.setProperty('title',t,true);this._oDialog.setTitle(t).setShowHeader(!!t);return this;};B.prototype.setTooltip=function(t){this._oDialog.setTooltip(t);return this;};B.prototype.getTooltip=function(){this._oDialog.getTooltip();return this;};B.prototype.setText=function(t){this.setProperty('text',t,true);if(!this._oLabel){if(t){this._oLabel=new sap.m.Label(this.getId()+'-TextLabel',{text:t}).addStyleClass('sapMBusyDialogLabel');this._oDialog.insertAggregation('content',this._oLabel,0);}}else{if(t){this._oLabel.setText(t).setVisible(true);}else{this._oLabel.setVisible(false);}}return this;};B.prototype.setCustomIcon=function(i){this.setProperty("customIcon",i,true);this._busyIndicator.setCustomIcon(i);return this;};B.prototype.setCustomIconRotationSpeed=function(s){this.setProperty("customIconRotationSpeed",s,true);this._busyIndicator.setCustomIconRotationSpeed(s);return this;};B.prototype.setCustomIconDensityAware=function(i){this.setProperty("customIconDensityAware",i,true);this._busyIndicator.setCustomIconDensityAware(i);return this;};B.prototype.setCustomIconWidth=function(w){this.setProperty("customIconWidth",w,true);this._busyIndicator.setCustomIconWidth(w);return this;};B.prototype.setCustomIconHeight=function(h){this.setProperty("customIconHeight",h,true);this._busyIndicator.setCustomIconHeight(h);return this;};B.prototype.setShowCancelButton=function(i){this.setProperty("showCancelButton",i,false);if(i){this._oDialog.setEndButton(this._getCancelButton());}else{this._destroyTheCancelButton();}return this;};B.prototype.setCancelButtonText=function(t){this.setProperty("cancelButtonText",t,false);if(t){this._getCancelButton().setText(t);this._oDialog.setEndButton(this._getCancelButton());}else{this._destroyTheCancelButton();}return this;};B.prototype.getDomRef=function(){return this._oDialog&&this._oDialog.getDomRef();};B.prototype._destroyTheCancelButton=function(){this._oDialog.destroyEndButton();this._cancelButton=null;};B.prototype._getCancelButton=function(){var c=this.getCancelButtonText();c=c?c:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("BUSYDIALOG_CANCELBUTTON_TEXT");return this._cancelButton?this._cancelButton:this._cancelButton=new sap.m.Button(this.getId()+'busyCancelBtn',{text:c,press:function(){this.close(true);}.bind(this)});};return B;},true);

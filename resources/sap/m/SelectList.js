/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation'],function(q,l,C,I){"use strict";var S=C.extend("sap.m.SelectList",{metadata:{library:"sap.m",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}},itemPress:{parameters:{item:{type:"sap.ui.core.Item"}}}}}});S.prototype._setSelectedIndex=function(i,_){var o;_=_||this.getItems();i=(i>_.length-1)?_.length-1:Math.max(0,i);o=_[i];if(o){this.setSelection(o);}};S.prototype.updateItems=function(r){this._bDataAvailable=false;this.destroyItems();this.updateAggregation("items");this._bDataAvailable=true;this.synchronizeSelection({forceSelection:false});setTimeout(this.synchronizeSelection.bind(this),0);};S.prototype.refreshItems=function(){this._bDataAvailable=false;this.refreshAggregation("items");};S.prototype._activateItem=function(i){if(i instanceof sap.ui.core.Item&&i&&i.getEnabled()){this.fireItemPress({item:i});if(this.getSelectedItem()!==i){this.setSelection(i);this.fireSelectionChange({selectedItem:i});}}};S.prototype._queryEnabledItemsDomRefs=function(d){var a="."+this.getRenderer().CSS_CLASS+"ItemBase";d=d||this.getDomRef();return d?Array.prototype.slice.call(d.querySelectorAll(a+":not("+a+"Disabled)")):[];};S.prototype._handleARIAActivedescendant=function(){var a=q(document.activeElement).control(0),d=this.getDomRef();if(a&&d){d.setAttribute("aria-activedescendant",a.getId());}};S.prototype.init=function(){this._iStartTimeout=0;this._iActiveTouchId=0;this._fStartX=0;this._fStartY=0;};S.prototype.onBeforeRendering=function(){this.synchronizeSelection();};S.prototype.onAfterRendering=function(){this.createItemNavigation();};S.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null;}this._$ItemPressed=null;};S.prototype.ontouchstart=function(e){if(sap.m.touch.countContained(e.touches,this.getId())>1||!this.getEnabled()){return;}e.setMarked();var t=e.targetTouches[0];this._iActiveTouchId=t.identifier;this._fStartX=t.pageX;this._fStartY=t.pageY;this._iStartTimeout=setTimeout(function(){var i=e.srcControl.$();if(i){i.addClass(this.getRenderer().CSS_CLASS+"ItemBasePressed");this._$ItemPressed=i;}}.bind(this),100);};S.prototype.ontouchmove=function(e){var t=null;if(!this.getEnabled()){return;}t=sap.m.touch.find(e.changedTouches,this._iActiveTouchId);if(t&&((Math.abs(t.pageX-this._fStartX)>10)||(Math.abs(t.pageY-this._fStartY)>10))){clearTimeout(this._iStartTimeout);if(this._$ItemPressed){this._$ItemPressed.removeClass(this.getRenderer().CSS_CLASS+"ItemBasePressed");this._$ItemPressed=null;}}};S.prototype.ontouchend=function(e){var t=null;if(!this.getEnabled()){return;}e.setMarked();t=sap.m.touch.find(e.changedTouches,this._iActiveTouchId);if(t){setTimeout(function(){if(this._$ItemPressed){this._$ItemPressed.removeClass(this.getRenderer().CSS_CLASS+"ItemBasePressed");this._$ItemPressed=null;}this._iStartTimeout=null;}.bind(this),100);}};S.prototype.ontouchcancel=S.prototype.ontouchend;S.prototype.ontap=function(e){if(this.getEnabled()){e.setMarked();this._activateItem(e.srcControl);}};S.prototype.onsapselect=function(e){if(this.getEnabled()){e.setMarked();e.preventDefault();this._activateItem(e.srcControl);}};S.prototype.onAfterFocus=function(c){this._handleARIAActivedescendant();};S.prototype.findFirstEnabledItem=function(a){a=a||this.getItems();for(var i=0;i<a.length;i++){if(a[i].getEnabled()){return a[i];}}return null;};S.prototype.setSelection=function(i){var s=this.getSelectedItem(),a=this.getRenderer().CSS_CLASS;this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",(i instanceof sap.ui.core.Item)?i.getId():i,true);if(typeof i==="string"){i=sap.ui.getCore().byId(i);}this.setProperty("selectedKey",i?i.getKey():"",true);if(s){s.$().removeClass(a+"ItemBaseSelected").attr("aria-selected","false");}s=this.getSelectedItem();if(s){s.$().addClass(a+"ItemBaseSelected").attr("aria-selected","true");}};S.prototype.synchronizeSelection=function(o){if(this.isSelectionSynchronized()){return;}var f=true;if(o){f=!!o.forceSelection;}var k=this.getSelectedKey(),i=this.getItemByKey(""+k);if(i&&(k!=="")){this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",i.getId(),true);}else if(f&&this.getDefaultSelectedItem()&&(!this.isBound("items")||this._bDataAvailable)){this.setSelection(this.getDefaultSelectedItem());}};S.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey());};S.prototype.findLastEnabledItem=function(i){i=i||this.getItems();return this.findFirstEnabledItem(i.reverse());};S.prototype.getVisibleItems=function(){for(var i=0,o,a=this.getItems(),v=[];i<a.length;i++){o=a[i];if(o.bVisible||(o.bVisible===undefined)){v.push(o);}}return v;};S.prototype.getSelectableItems=function(){return this.getEnabledItems(this.getVisibleItems());};S.prototype.findItem=function(p,v){var m="get"+p.charAt(0).toUpperCase()+p.slice(1);for(var i=0,a=this.getItems();i<a.length;i++){if(a[i][m]()===v){return a[i];}}return null;};S.prototype.getItemByText=function(t){return this.findItem("text",t);};S.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"));};S.prototype.getDefaultSelectedItem=function(i){return null;};S.prototype.clearSelection=function(){this.setSelection(null);};S.prototype.createItemNavigation=function(){var d;if(!this._oItemNavigation){this._oItemNavigation=new I(null,null,!this.getEnabled());this._oItemNavigation.attachEvent(I.Events.AfterFocus,this.onAfterFocus,this);this.addEventDelegate(this._oItemNavigation);}d=this.getDomRef();this._oItemNavigation.setRootDomRef(d);this._oItemNavigation.setItemDomRefs(this._queryEnabledItemsDomRefs(d));this._oItemNavigation.setCycling(false);this._oItemNavigation.setSelectedIndex(this.indexOfItem(this.getSelectedItem()));this._oItemNavigation.setPageSize(10);};S.prototype.setSelectedItem=function(i){if(typeof i==="string"){this.setAssociation("selectedItem",i,true);i=sap.ui.getCore().byId(i);}if(!(i instanceof sap.ui.core.Item)&&i!==null){return this;}if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);return this;};S.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);this.setSelection(i);return this;};S.prototype.setSelectedKey=function(k){k=this.validateProperty("selectedKey",k);var i=this.getItemByKey(k);if(i||(k==="")){if(!i&&k===""){i=this.getDefaultSelectedItem();}this.setSelection(i);return this;}return this.setProperty("selectedKey",k);};S.prototype.getSelectedItem=function(){var s=this.getAssociation("selectedItem");return(s===null)?null:sap.ui.getCore().byId(s)||null;};S.prototype.getItemAt=function(i){return this.getItems()[+i]||null;};S.prototype.getFirstItem=function(){return this.getItems()[0]||null;};S.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null;};S.prototype.getEnabledItems=function(i){i=i||this.getItems();return i.filter(function(o){return o.getEnabled();});};S.prototype.getItemByKey=function(k){return this.findItem("key",k);};S.prototype.removeItem=function(i){i=this.removeAggregation("items",i);if(this.getItems().length===0){this.clearSelection();}else if(this.isItemSelected(i)){this.setSelection(this.getDefaultSelectedItem());}return i;};S.prototype.removeAllItems=function(){var i=this.removeAllAggregation("items");this.clearSelection();return i;};S.prototype.destroyItems=function(){this.destroyAggregation("items");return this;};S.prototype.setNoDataText=q.noop;return S;},true);

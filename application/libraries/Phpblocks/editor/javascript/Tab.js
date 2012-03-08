/**
 **
 ** This file is part of @APPLICATIONNAME@ @VERSION@.
 **
 ** Andreas Herz proprietary/confidential. Use is subject to license terms.
 **
 ** Unauthorized redistribution of this file are strictly forbidden.
 **
 ** Copyright (c) 2011 by Andreas Herz, Fichtenstrasse 70,
 ** 68535 Edingen Neckarhausen, Germany. All rights reserved.
 **
 **/

var Tabs = Class.create();

Object.extend(Tabs, {
	FIRST:  'first',
	LAST:   'last',
	NEXT:   'next',
	PREV:   'prev',
	ACTIVE: 'active',
	Text: {
		FIRST:   'First',
		LAST:    'Last',
		NEXT:    'Next',
		PREV:    'Previous',
		LABEL:   'New label...',
		CONTENT: 'Default content...',
		LOADING: 'Loading...',
		EMPTY:   'No tabs...'
	},
	ClassNames: {
		CONTAINER:  'tab-container',
		NAVIGATION: 'tab-navigation',
		PANEL:      'tabs',
		LI:         '',
		CURRENT:    'current',
		LINK:       '',
		CONTENT:    'tab',
		LOADING:    'loading',
		EMPTY:      'empty'
	}
});

Object.extend(Tabs.prototype, {
	initialize: function(elm, opt) {
		this.elm = $(elm);
		if(!Object.isElement(this.elm)) return;
		this.opt = Object.extend({
			start: Tabs.FIRST,
			rotate: false,
			navigation: false,
			deleteLast: false,
			ajax: false,
			ajaxCache: false,
			ajaxOptions: {},
			classNames: {},
			event: {
				stop: true,
				observe: 'click'
			},
			text: {
				loading: Tabs.Text.LOADING,
				empty: Tabs.Text.EMPTY,
				content: Tabs.Text.CONTENT
			},
			callback: {
				afterOpen:  null,
				afterClose: null,
				isEmpty:    null
			}
		}, opt || {});
		this.elm.addClassName(this.cssClass('CONTAINER'));
		var panels = this.getPanels(true);
		if(this.opt.start == Tabs.FIRST) this.opt.start = 0;
		else if(this.opt.start == Tabs.LAST || (Object.isNumber(this.opt.start) && this.opt.start > this.max)) this.opt.start = this.max;
		else this.opt.start = 0;
		if(!!this.opt.navigation) this.buildNavigation();
		if(this.isEmpty()) {
			this.setEmpty();
			return;
		}
		panels.each(function(panel, index) {
			panel.LINK.observe(this.opt.event.observe, this.attachEvent.bindAsEventListener(this, index));
			if(index != this.opt.start) this.closePanel(index);
		}.bind(this));
		this.openPanel(this.opt.start);
	},
	cssClass: function(ident) {
		var className;
		if(!!this.opt.classNames[ident]) className = this.opt.classNames[ident];
		else if(!!Tabs.ClassNames[ident]) className = Tabs.ClassNames[ident];
		return className || '';
	},
	attachEvent: function(ev, index, mode) {
		if(!!this.opt.event.stop) ev.stop();
		var modes = ['open', 'close', 'toggle', 'reload', 'delete', 'add'];
		this[(modes.include(mode) ? mode : 'open') + 'Panel'].call(this, index, true);
	},
	isEmpty: function() {
		if(!Object.isNumber(this.max)) this.getPanels(true);
		return this.max < 0;
	},
	setEmpty: function(mode) {
		mode = (mode === false ? 'show' : 'hide');
		if(!!this.panel && Object.isElement(this.panel)) this.panel[mode]();
		if(!!this.nav && Object.isElement(this.nav)) this.nav[mode]();
		var empty = this.elm.down('div.' + this.cssClass('EMPTY'));
		if(!Object.isElement(empty)) {
			empty = new Element('div', {'class':this.cssClass('EMPTY')}).update(this.opt.text.empty);
			this.elm.insert(empty);
		}
		empty[(mode == 'show' ? 'hide' : 'show')]();
		if(mode == 'hide' && Object.isFunction(this.opt.callback.isEmpty)) this.opt.callback.isEmpty.call();
	},
	buildNavigation: function() {
		this.nav = new Element('div', {'class':this.cssClass('NAVIGATION')});
		['FIRST', 'PREV', 'NEXT', 'LAST'].each(function(mode) {
			var item = new Element('a', {href:'javascript:;', 'class':'nav-' + mode.toLowerCase()});
			this.nav.insert(item);
			item.update(Tabs.Text[mode]).observe('click', function(ev) {
				this.openPanel(Tabs[mode]);
			}.bindAsEventListener(this));
		}.bind(this));
		this.elm.insert(this.nav);
	},
	getPanels: function(reset) {
		if(!this.panels || reset === true) {
			this.panels = [];
			var index = -1, classNames = $w(this.cssClass('PANEL'));
			this.panel = this.elm.down('ul.' + classNames.first());
			if(Object.isElement(this.panel)) {
				classNames.each(function(name) {
					if(!this.panel.hasClassName(name)) this.panel.addClassName(name);
				}.bind(this));
				this.panel.select('li').each(function(li) {
					var link = li.down('a');
					if(Object.isElement(link)) {
						var rel = link.readAttribute('rel'), content;
						if(!Object.isString(rel) || !Object.isElement($(rel))) {
							content = new Element('div', {style:'display:none', id:(Object.isString(rel) ? rel : null)}).update(this.opt.text.content);
							link.writeAttribute('rel', content.identify());
							this.panel.insert({after:content});
						} else content = $(rel);
						this.panels.push({
							LI:      li.addClassName(this.cssClass('LI')),
							LINK:    link.addClassName(this.cssClass('LINK')),
							CONTENT: content.addClassName(this.cssClass('CONTENT')),
							INDEX:   ++index
						});
					}
				}.bind(this));
			}
			this.max = index;
		}
		return this.panels;
	},
	panelByIndex: function(index) {
		var panels = this.getPanels();
		switch(index) {
			case Tabs.FIRST: index = 0; break;
			case Tabs.LAST: index = this.max; break;
			case Tabs.ACTIVE: index = this.active || 0; break;
			case Tabs.NEXT:
				index = ((this.active || 0) + 1);
				if(index > this.max && this.opt.rotate) index = 0;
				break;
			case Tabs.PREV:
				index = ((this.active || 0) - 1);
				if(index < 0 && this.opt.rotate) index = this.max;
				break;
		}
		return Object.isNumber(index) && index >= 0 && index <= this.max ? panels[index] : false;
	},
	togglePanel: function(index) {
		var panel;
		if((panel = this.panelByIndex(index)) !== false) this[(panel.CONTENT.visible() ? 'close' : 'open') + 'Panel'].call(this, panel.INDEX);
	},
	openPanel: function(index, callback) {
		var panel;
		if((panel = this.panelByIndex(index)) !== false && this.active != panel.INDEX) {
			if(Object.isNumber(this.active)) this.closePanel(this.active);
			this.active = panel.INDEX;
			panel.LI.addClassName(this.cssClass('CURRENT'));
			panel.CONTENT.show();
			if(!!callback && Object.isFunction(this.opt.callback.afterOpen)) this.opt.callback.afterOpen.call(null, panel);
			this.reloadPanel(panel.INDEX);
		}
	},
	closePanel: function(index, callback) {
		var panel;
		if((panel = this.panelByIndex(index)) !== false) {
			this.active = null;
			var class_curr = this.cssClass('CURRENT'), class_load = this.cssClass('LOADING');
			if(panel.LI.hasClassName(class_curr)) panel.LI.removeClassName(class_curr);
			if(panel.LI.hasClassName(class_load)) panel.LI.removeClassName(class_load);
			panel.CONTENT.hide();
			if(!!callback && Object.isFunction(this.opt.callback.afterClose)) this.opt.callback.afterClose.call(null, panel);
		}
	},
	reloadPanel: function(index) {
		var panel;
		if(!this.opt.ajax || (panel = this.panelByIndex(index)) === false || panel.CONTENT.STATIC === true) return;
		var url = this.opt.ajax;
		if(Object.isFunction(url)) url = url.call(null, panel);
		if(!Object.isString(url)) return;
		if(this.opt.ajaxCache) {
			if(!this.ajaxCached) this.ajaxCached = {};
			if(this.ajaxCached[url]) {
				panel.CONTENT.update(this.ajaxCached[url]);
				return;
			}
		}
		var class_load = this.cssClass('LOADING');
		panel.CONTENT.addClassName(class_load).update(this.opt.text.loading);
		if(Object.isFunction(this.opt.ajaxOptions.onSuccess)) var oldOnSuccess = this.opt.ajaxOptions.onSuccess;
		var opt = Object.extend(this.opt.ajaxOptions, {
			onSuccess: function(t) {
				if(this.ajaxCached) this.ajaxCached[url] = t.responseText;
				if(panel.CONTENT.hasClassName(class_load)) panel.CONTENT.removeClassName(class_load);
				if(!!oldOnSuccess) oldOnSuccess(t);
			}.bind(this)
		});
		new Ajax.Updater(panel.CONTENT, url, opt);
	},
	deletePanel: function(index) {
		var panel;
		if((panel = this.panelByIndex(index)) !== false && (this.opt.deleteLast || this.max > 0)) {
			if(panel.INDEX == this.active) this.openPanel(Tabs.NEXT);
			panel.LI.remove();
			panel.CONTENT.remove();
			this.getPanels(true);
			if(this.isEmpty()) this.setEmpty();
		}
	},
	addPanel: function(label, content, focus) {
		if(this.isEmpty()) this.setEmpty(false);
		if(Object.isFunction(content)) content = content.call();
		var tmp = new Element('div', {'class':this.cssClass('CONTENT'), style:'display:none'}), rel = tmp.identify();
		if(Object.isArray(content)) tmp.each(function(part) { tmp.insert(part); });
		else tmp.insert((!!content ? content : this.opt.text.content));
		tmp.STATIC = true;
		var link = new Element('a', {href:'javascript:;', rel:rel, 'class':this.cssClass('LINK')}).update((!Object.isString(label) ? Tabs.Text.LABEL : label));
		this.panel.insert({
			bottom: new Element('li').insert(link),
			after: tmp
		});
		if(!Object.isNumber(this.max)) this.getPanels(true);
		link.observe(this.opt.event.observe, this.attachEvent.bindAsEventListener(this, (this.max + 1)));
		this.getPanels(true);
		if(this.max == 0 || focus !== false) {
			if(this.max == 0) this.active = null;
			this.openPanel(this.max);
		}
	}
});
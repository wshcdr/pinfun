var PinData = function(h) {
	this.imgUrl = null;
	this.descript = '';
	this.height = h;
	this.ui = null;
	this.init();
};

PinData.prototype = {
	init : function() {
		this.ui = $('<div/>').addClass('pin').css('height', this.height);
	},
	
	getHeight : function() {
		return this.ui.height() + 30;
	}
};

var PinDataContainer = {
	data : [],
	columns : [],
	container : null,
	init : function() {
		this.container = $('#ColumnContainer');
		for (var i = 0; i < 5; i++) {
			var left = (222 * i) + 150;
			this.columns.push({height:0, left:left});
		}
	},
	
	pin : function(pindata) {
		var column = this.columns[0];
		for (var i = 1; i < this.columns.length; i++) {
			if (this.columns[i].height < column.height) {
				column = this.columns[i];
			}
		}
		
		pindata.ui.css('top', (column.height + 15) + 'px').css('left', column.left + 'px');
		column.height += pindata.getHeight();
		
		this.container.append(pindata.ui);
	}
	
};
var PinData = function() {
	this.imgUrl = null;
	this.descript = '';
	this.ui = null;
	this.init();
};

PinData.prototype = {
	init : function() {
		var height = parseInt(100 + Math.random() * 300) + 'px';
		this.ui = $('<div/>').addClass('pin').css('height', height);
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
		var left = 0;
		for (var i = 0; i < 5; i++) {
			this.columns.push({height:0, left:left});
			left += 222 + 15;;
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
var PinData = function(data) {
	this.id = null;
	this.thumb = null;
	this.image = null;
	this.picWidth = 0;
	this.picHeight = 0;
	this.description = '';
	this.likeCount = 0;
	this.commentsCount = 0;
	this.repinsCount = 0;
	this.userId = null;
	this.userName = null;
	this.userIcon = null;
	this.topic = {
		id : null,
		name : null
	};
	this.comments = [];

	this.ui = null;
	this.init(data);
};

PinData.prototype = {
	init : function(data) {
		this._loadParameter(data);
		this.ui = $("<div class='pin'></div>").attr('id', this.id);
		this._renderImage();
		this._renderDescription();
		this._renderState();
		this._renderCategory();
		this._renderComments();
	},

	_loadParameter : function(data) {
		for ( var p in data) {
			this[p] = data[p];
		}
	},
	
	_renderImage : function() {
		var holder = $("<div class='pinHolder'></div>");
		var a = $("<a></a>").addClass("PinImage ImgLink").attr("href", this.image);
		var img = $("<img class='PinImageImg'/>").attr("src", this.thumb).attr("height", this.picHeight).attr("alt", this.description);
		a.append(img);
		holder.append(a);
		this.ui.append(holder);
	},

	_renderDescription : function() {
		this.ui.append($("<p class='description'></p>").append(this.description));
	},

	_renderState : function() {
		var state = $("<p/>").addClass("stats colorless");
		state.append($("<span/>").text(this.likeCount + ' likes '));
		state.append($("<span/>").text(this.commentsCount + ' comments '));
		state.append($("<span/>").text(this.repinsCount + ' repins '));
		this.ui.append(state);
	},

	_renderCategory : function() {
		var holder = $("<div class='convo attribution clearfix'></div>");
		$("<a class='ImgLink'></a>").attr("href", this.userId).append("<img src='" + this.userIcon + "'>").appendTo(holder);
		$("<a></a>").attr("href", this.userId).append(this.userName).appendTo(holder);
		holder.append(" onto ");
		$("<a></a>").attr("href", this.topic.id).append(this.topic.name).appendTo(holder);
		this.ui.append(holder);

	},

	_renderComments : function() {
		var commHolder = $("<div class='comments colormuted'></div>");
		for ( var i = 0; i < this.comments.length; i++) {
			var commObj = $("<div class='comment convo clearfix'></div>").attr('id', this.comments[i].id);
			var a1 = $("<a class='ImgLink'></a>").attr("href", this.comments[i].userId).append($("<img class='profile user_image'/>").attr("src", this.comments[i].userIcon));
			var a2 = $("<a></a>").attr("href", this.comments[i].userId).append(this.comments[i].userName);
			commObj.append(a1);
			commObj.append(a2);
			commObj.append(" " + this.comments[i].content);
			commHolder.append(commObj);
		}
		if (this.commentsCount > this.comments.length) {
			commHolder.append($("<a class='all comment convo clearfix'></a>").attr("href", this.image).text("All " + this.commentsCount + " comments..."));
		}
		this.ui.append(commHolder);
	},

	height : function() {
		return this.ui.height();
	}
};

var DataLayout = {
	minColumnCount : 4,
	pinWidth : 192,
	columnPadding : 30,
	topPadding : 15,
	columnMargin : 15,
	columnCount : 4,
	dataArray : [],
	colArray : [],

	init : function(param) {
		this.setupContext();
	},

	setupContext : function() {
		/*load width*/
		this._setupLayoutWidth();
		this._setupColumns();
	},

	_setupLayoutWidth : function() {
		var columnWidth = this.pinWidth + this.columnPadding + this.columnMargin;
		this.columnCount = Math.max(this.minColumnCount, parseInt(($(window).width() + this.columnMargin) / columnWidth));
		var containerWidth = (this.columnCount * columnWidth - this.columnMargin);
		$("#ColumnContainer").width(containerWidth);
	},
	
	_setupColumns : function() {
		this.colArray = [];
		var left = 0;
		for ( var i = 0; i < this.columnCount; i++) {
			this.colArray.push({height:0, left:left});
			left += this.pinWidth + this.columnPadding + this.columnMargin;
		}
	},

	resize : function() {
		var origColumnCount = this.columnCount;
		this._setupLayoutWidth();
		if (origColumnCount == this.columnCount) {
			return;
		}
		this._setupColumns();
		this._showContent();
	},
	
	loadNewData : function(_jsonArray) {
		for (var i = 0; i < _jsonArray.length; i++) {
			var data = new PinData(_jsonArray[i]);
			this._showPinData(data);
			this.dataArray.push(data);
		}
		this._refreshContainerHeight();
	},
	
	_showContent : function() {
		$("#ColumnContainer").empty();
		for (var i = 0; i < this.dataArray.length; i++) {
			this._showPinData(this.dataArray[i]);
		}
		this._refreshContainerHeight();
	},
	
	_showPinData : function(data) {
		var minCol = this._getMinMaxHeightColumn(false);
		data.ui.css("top", minCol.height).css("left", minCol.left);
		$("#ColumnContainer").append(data.ui);
		minCol.height += data.height() + this.topPadding + this.columnMargin;
	},
	
	_getMinMaxHeightColumn : function(b) {		//false:min height, true:max height
		var col = this.colArray[0];
		for (var i = 1; i < this.colArray.length; i++) {
			if (!b && this.colArray[i].height < col.height) {
				col = this.colArray[i];
			}
			if (b && this.colArray[i].height > col.height) {
				col = this.colArray[i];
			}
		}
		return col;
	},

	_refreshContainerHeight : function() {
		var maxCol = this._getMinMaxHeightColumn(true);
		$("#ColumnContainer").height(maxCol.height);
	}
};

$(function() {
	$(window).resize(function() {
		DataLayout.resize();
	});
	
	$(document).scroll(function(){
        if (($(window).scrollTop() + $(window).height()) == $(document).height()) {	//at the bottom
        	$.ajax({
        		type: "GET",
        		url : "data.txt",
        		cache : false,
        		async : true,
        		success : function(txt) {
        			var _data = eval("(" + txt + ")");
        			DataLayout.loadNewData(_data);
        		}
        	});
        }
    });
});

$(function() {
	$.ajax({
		type: "GET",
		url : "data.txt",
		cache : false,
		async : true,
		success : function(txt) {
			var _data = eval("(" + txt + ")");
			DataLayout.loadNewData(_data);
		}
	});
});

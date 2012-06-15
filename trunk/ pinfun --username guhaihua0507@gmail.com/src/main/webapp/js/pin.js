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
	
	this.container = null;
	this.init(data);
};

PinData.prototype = {
	init : function(data) {
		for (var p in data) {
			this[p] = data[p];
		}
		this.container = $("<div class='pin'></div>").attr('id', this.id);
		
		this.renderImage();
		this.renderDescription();
		this.renderState();
		this.renderCategory();
		this.renderComments();
	},
	
	renderImage : function() {
		var holder = $("<div class='pinHolder'></div>");
		var a = $("<a></a>").addClass("PinImage ImgLink").attr("href", this.image);
		var img = $("<img class='PinImageImg'/>").attr("src", this.thumb).attr("height", this.picHeight).attr("alt", this.description);
		a.append(img);
		holder.append(a);
		this.container.append(holder);
	},
	
	renderDescription: function() {
		this.container.append($("<p class='description'></p>").append(this.description));
	},
	
	renderState : function() {
		var state = $("<p/>").addClass("stats colorless");
		state.append($("<span/>").text(this.likeCount + ' likes '));
		state.append($("<span/>").text(this.commentsCount + ' comments '));
		state.append($("<span/>").text(this.repinsCount + ' repins '));
		this.container.append(state);
	},
	
	renderCategory : function() {
		var holder = $("<div class='convo attribution clearfix'></div>");
		$("<a class='ImgLink'></a>").attr("href", this.userId).append("<img src='" + this.userIcon + "'>").appendTo(holder);
		$("<a></a>").attr("href", this.userId).append(this.userName).appendTo(holder);
		holder.append(" onto ");
		$("<a></a>").attr("href", this.topic.id).append(this.topic.name).appendTo(holder);
		this.container.append(holder);

	},
	
	renderComments : function() {
		var commHolder = $("<div class='comments colormuted'></div>");
		for (var i = 0; i < this.comments.length; i++) {
			var commObj = $("<div class='comment convo clearfix'></div>").attr('id', this.comments[i].id);
			var a1 = $("<a class='ImgLink'></a>").attr("href", this.comments[i].userId).append($("<img class='profile user_image'/>").attr("src", this.comments[i].userIcon));
			var a2 = $("<a></a>").attr("href", this.comments[i].userId).append(this.comments[i].userName);
			commObj.append(a1);
			commObj.append(a2);
			commObj.append(" " + this.comments[i].content);
			commHolder.append(commObj);
		}
		this.container.append(commHolder);
	},
	
	height : function() {
		return this.container.height();
	}
};

var DataLayout = {
	minColumnCount : 4,
	pinWidth: 192,
	columnPadding : 30,
	topPadding : 15,
	columnMargin: 15,
	columnCount : 4,
	dataArray : [],
	columns : [],
	
	init : function(param) {
		this.loadContext();
		var left = 0;
		for ( var i = 0; i < this.columnCount; i++) {
			this.columns.push({height : 0, left : left });
			left += this.pinWidth + this.columnPadding + this.columnMargin;
		}
	},

	loadContext : function() {
		var columnWidth = this.pinWidth + this.columnPadding + this.columnMargin;
		this.columnCount = Math.max(this.minColumnCount, parseInt(($(window).width() + this.columnMargin) / columnWidth));
		var containerWidth = (this.columnCount * columnWidth - this.columnMargin);
		$("#ColumnContainer").width(containerWidth);
	},
	
	loadData : function(d) {
		for (var i = 0; i < d.length; i++) {
			this.pin(new PinData(d[i]));
		}
		this.calculateHeight();
	},
	
	pin : function(pindata) {
		var column = this.columns[0];
		for ( var i = 1; i < this.columns.length; i++) {
			if (this.columns[i].height < column.height) {
				column = this.columns[i];
			}
		}

		pindata.container.css({
			top : column.height + 'px',
			left : column.left + 'px'
		});

		$("#ColumnContainer").append(pindata.container);
		column.height += pindata.height() + this.topPadding + this.columnMargin;
		this.dataArray.push(pindata);
	},
	
	calculateHeight : function() {
		var maxHeight = 0;
		for (var i = 0; i < this.columns.length; i++) {
			maxHeight = Math.max(maxHeight, this.columns[i].height);
		}
		$("#ColumnContainer").height(maxHeight);
	}
	
};
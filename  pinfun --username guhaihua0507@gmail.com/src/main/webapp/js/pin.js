var PinData = function(data) {
	this.id = null;
	this.iconImage = null;
	this.width = 0;
	this.height = 0;
	this.image = null;
	this.description = '';
	this.likeCount = 0;
	this.commentsCount = 0;
	this.repinsCount = 0;
	this.user = {
		id : null,
		name : null,
		icon : null
	};
	this.topic = {
		id : null,
		name : null
	};
	this.comments = [];
	
	this.viewUI = null;
	this.init(data);
};

PinData.prototype = {
	init : function(data) {
		for (var p in data) {
			this[p] = data[p];
		}
		this.viewUI = $("<div class='pin'></div>").attr('id', this.id);
		
		var pinHolder = $("<div class='pinHolder'></div>");
		pinHolder.append("<a href=" + this.image + " class='PinImage ImgLink'><img src='" + this.iconImage + "' height=" + this.height + " alt='" + this.description + "' class='PinImageImg'></a>");
		this.viewUI.append(pinHolder);
		
		this.viewUI.append("<p class='description'>" + this.description + "</p>");
		var state = $('<p/>').addClass('stats colorless').appendTo(this.viewUI);
		state.append($("<span/>").text(this.likeCount + ' likes '));
		state.append($("<span/>").text(this.commentsCount + ' comments '));
		state.append($("<span/>").text(this.repinsCount + ' repins '));
		
		$("<div class='convo attribution clearfix'></div>").append("<a href='" + this.user.id + "' class='ImgLink'><img src='"+ this.user.icon +"'></a>")
			.append("<a href='" + this.user.id + "'>"+ this.user.name + "</a><a href='" + this.topic.id + "'>"+this.topic.name+"</a>").appendTo(this.viewUI);
		
		var comets = $("<div class='comments colormuted'></div>").appendTo(this.viewUI);
		for (var i = 0; i < this.comments.length; i++) {
			var commObj = $("<div class='comment convo clearfix'></div>").attr('id', this.comments[i].id);
			commObj.append("<a href='" + this.comments[i].user.id + "' class='ImgLink'><img src='"+ this.comments[i].user.icon +"' class='profile user_image'></a>");
			commObj.append("<a href='" + this.comments[i].user.id + "'>" + this.comments[i].content + "</a>");
			comets.append(commObj);
		}
	},
};

var DataLayout = {
	columnCount : 4,
	dataArray : [],
	columns : [],
	pinWidth: 192,
	columnPadding : 30,
	topPadding : 15,
	columnMargin: 15,
	
	init : function(param) {
		var left = 0;
		for ( var i = 0; i < this.columnCount; i++) {
			this.columns.push({
				height : 0,
				left : left
			});
			left += this.pinWidth + this.columnPadding + this.columnMargin;
		}
	},

	show : function(d) {
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

		pindata.viewUI.css({
			top : column.height + 'px',
			left : column.left + 'px'
		});

		$("#ColumnContainer").append(pindata.viewUI);
		column.height += pindata.viewUI.height() + this.topPadding + this.columnMargin;
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
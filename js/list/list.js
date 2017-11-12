define(["backbone","zepto","underscore","css!list/list.css"], function(Backbone, $, _){
	return Backbone.View.extend({
		//绑定事件
		events:{
			//搜索
			'tap .topBar .search':'gotoSearch',
			'focus .topBar input':"showMtk",
			'blur .topBar input':"hideMtk",
			'tap .go-top':"goTop",
			'tap .order li':"listOrder"
		},
		//定义模板
		tpl:_.template($('#list_tpl').text()),
		initialize:function(){
			this.initDom()
			this.listenTo(this.collection, 'add', function(model, collection, options) {
				this.render(model)
			})
			this.getData();
			this.bindEvents();
		},
		bindEvents: function() {
			// 缓存实例化对象
			var me = this;
			// 基于时间节流解决高频操作的问题
			// var fn = _.throttle(function() {
			// 	me.getData();
			// }, 500)
			// 绑定scroll事件，监听滚动
			$(window).on('scroll', function() {
				if ($('body').height() < $(window).scrollTop() + $(window).height() + 200) {
					// me.getData();
					// fn()
				}
				// 切换返回顶部按钮显隐
				me.toggleGoTop();
			})
		},
		//回到顶部
		goTop: function(){
			this.backTo(0,500);
		},
		//爬梯
		backTo: function(target,time,callback){
	    	var now = document.documentElement.scrollTop || document.body.scrollTop;
	    	var distance = target-now;
	    	var pinlv = 20;
	    	var allCount = time/pinlv;
	    	var step = distance/allCount;
	    	var count = 0;
	    	var timer = setInterval(function(){
	    		count++;
	    		document.body.scrollTop += step;
	    		document.documentElement.scrollTop += step;
	    		if(count>=allCount){
	    			clearInterval(timer);
	    			document.body.scrollTop=target;
	    			document.documentElement.scrollTop=target;
	    			callback&&callback();
	    		}
	    	},pinlv)
	    },
		// 切换返回顶部按钮显隐
		toggleGoTop: function() {
			// 滚动了300像素显示
			if ($(window).scrollTop() > 300) {
				this.$('.go-top').show()
			} else {
				// 隐藏
				this.$('.go-top').hide();
			}
		},
		initDom: function(){
			this.listDom = this.$('#listContent');
		},
		getData: function(){
			this.collection.fetchData();
		},
		render: function(model){
			//获得容器
			var data = {
				href : '#detail/'+ model.get('id'),
				url : 'img/list_img/'+model.get('img'),
				title: model.get('title'),
				address: model.get('address'),
				floor: model.get('floor'),
				fullCut: model.get('fullCut'),
				package: model.get('package'),
				style: model.get('evaluate')/5*100+'%'
			}
			var html = this.tpl(data);
			// 渲染
			this.listDom.append(html);
		},
		//获得输入框的内容
		getSearchInputValue: function(){
			return this.$('.searchWrap input').val();
		},
		//检测内容
		checkSearchInputValue: function(val){
			// 如果是空格就不通过
			if(/^\s*$/.test(val)){
				return true
			}else{
				return false
			}
		},
		//清除两边的空格
		trim: function(val){
			return val.replace(/^\s+|\s+$/g, "");
		},
		//过滤内容
		collectionFilter: function(val){
			return this.collection.filter(function(model){
				//是否和title的文字一样
				return model.get('title').indexOf(val) >= 0;
			})
		},
		//清空视图
		clearView: function(){
			this.listDom.html("");
		},
		//重新渲染符合条件的内容
		renderAll: function(arr){
			var me = this;
			_.forEach(arr, function(model){
				me.render(model);
			})
		},
		//搜索
		gotoSearch: function(model){
			//存储数据
			var val = this.getSearchInputValue();
			//判断内容的合法性
			if(this.checkSearchInputValue(val)){
				return;
			}
			//清除两边的空格
			var val = this.trim(val);
			//过滤集合
			var result = this.collectionFilter(val);
			//清空视图
			this.clearView();
			//重新渲染符合条件
			this.renderAll(result);
			//跳到list
			window.location.hash = "list";
		},
		//数据排序
		listOrder: function(e) {
			//存储数据
			var val = this.getSearchInputValue();
			//过滤集合
			var filterVal = this.collectionFilter(val);
			var collection = this.collection;
			var result = null;
			//获取点击的元素的data-type元素
			var type = $(e.target).attr("data-type") ? $(e.target).attr("data-type") : $(e.target).parent().attr("data-type");
			console.log(type)
			//变换颜色
			$('.'+type).children('span').css({
				"color":"red",
				"border-top-color":"red"
			}).parent().siblings().children('span').css({
				"color":"#333",
				"border-top-color":"#ccc"
			});
			//如果输入框有内容
			if(val){
				result = _.sortBy(filterVal, function(model){
						return -model.get(type)
				})
			}else{
				result = collection.sortBy(function(model, index, models){
						return -model.get(type)
				})
			}
			this.clearView();
			//重新渲染符合条件
			this.renderAll(result);
		},
		//阻止页面滚动
		stopScroll: function(){
			$('#app').on('touchmove',function(e){
				e.preventDefault();
			},false)
		},
		//显示模态框
		showMtk: function(){
			var oDiv = $('<div class="mtk"></div>');
			$('#app').append(oDiv);
			oDiv.css({
				"position":"fixed",
				"left":0,
				"right":0,
				"top":0,
				"bottom":0,
				"background":"#000",
				"opacity":"0.8",
				"z-index":200,
				"width":"100%",
				"height":"100%"
			});
			this.stopScroll();
		},
		//隐藏模态框
		hideMtk: function(){
			$('body').removeAttr('style');
			$('.mtk').remove();
			$("#app").off('touchmove');
		}
	})
})
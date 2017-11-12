//首页
define(["backbone","underscore","zepto.touch","zepto","css!home/home.css"], function(Backbone, _, $){
	return Backbone.View.extend({
			tpl:_.template($('#sale_tpl').text()),
			events:{
				"tap #salePaper li":"show"
			},
			initialize:function(){
				this.initDOM();
				this.listenTo(this.collection, 'add', function(model, collection, options) {
					this.render(model)
				})
				//获得数据
				this.getData();
			},
			show:function(){
				console.log(111);
			},
			// collection:ImageCollection,
			//获得数据
			getData: function(){
				this.collection.fetchData();
			},
			initDOM: function() {
				this.salePaper = this.$("#salePaper");
			},
			// 渲染视图
			render: function(model){
				//获得数据
				var data = {
					url: "img/ad/"+model.get('url'),
					href: "#detail/"+model.get("id"),
					img: "img/ad/"+model.get("img"),
					title:model.get("title")
				}
				//格式化模板
				var html = this.tpl(data);
				//渲染模板
				this.salePaper.append(html)
				
			},
	})
})
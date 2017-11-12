define(["backbone","zepto","underscore"], function(Backbone, $, _){
	return Backbone.View.extend({
		//定义模板
		tpl:_.template($('#menu_tpl').text()),
		initialize:function(){
			this.initDom()
			this.listenTo(this.collection, 'add', function(model, collection, options) {
				this.render(model)
			})
			this.getData();
		},
		initDom: function(){
			this.menuDom = this.$('#menuBox');
		},
		getData: function(){
			this.collection.fetchData();
		},
		render: function(model){
			//获得容器
			var data = {
				href : "#list/",
				src : 'img/menu_img/'+model.get('src'),
				title: model.get('title')
			}
			var html = this.tpl(data);
			// 渲染
			this.menuDom.append(html);
		}
	})
})
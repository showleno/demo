define(["backbone", "zepto", "underscore"], function(Backbone,$,_){
	return Backbone.View.extend({
		tpl:_.template($('#foot_tpl').text()),
		initialize:function(){
			this.initDom();
			this.listenTo(this.collection, 'add' , function(model, collection, options){
				this.render(model);
			})
			this.getData();
		},
		getData: function(){
			this.collection.fetchData();
		},
		initDom: function(){
			this.footDom = this.$('#Links');
		},
		render: function(model){
			var data = {
				href : model.get('href'),
				name: model.get('name'),
				title: model.get('title')
			}
			var html = this.tpl(data);
			this.footDom.append(html);
		}
	})
})
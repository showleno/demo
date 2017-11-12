define(["backbone","zepto","underscore","model/home/footer"], function(Backbone, $, _, ImageModel){
	return Backbone.Collection.extend({
		model:ImageModel,
		url:"data/footer.json",
		modelID: 0,
		fetchData: function(){
			var me = this;
			$.get(this.url, function(res){
				if(res && res.errno === 0){
					_.forEach(res.data, function(obj, index, arr){
						//添加id
						obj.id = me.modelID++;
					})
					me.add(res.data)
				}
			})
		}
	})
})
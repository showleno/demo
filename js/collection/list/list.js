define(["backbone", "underscore", "zepto", "model/list"], function(Backbone, _, $, ImageModel){
	//定义集合
	var ImageCollection = Backbone.Collection.extend({
		// //绑定模型
		model:ImageModel,
		//定义请求数据
		url:"data/list.json",
		//拉取数据
		// 定义id计数器
		modelID: 0,
		// 由于返回的数据格式跟我们期望的不一致，所以我们要定义请求数据的方法
		fetchData: function() {
			// 缓存this
			var me = this;
			$.get(this.url, function(res) {
				// 数据返回成功，我们要存储在集合中
				if (res && res.errno === 0) {
					_.forEach(res.data, function(obj, index, arr) {
						// 为obj添加id
						obj.id = me.modelID++;
					})
					// 存储数组
					me.add(res.data)
				}
			})
		},
	})
	// var ic = new ImageCollection();
	// 	// ic.fetch()
	// 	ic.fetch({
	// 		success: function() {
	// 			console.log(arguments)
	// 		}
	// 	})
	return ImageCollection
})
// 定义图片模型类
define(['backbone', 'zepto'], function(Backbone, $) {
	
	// 创建图片模型
	var ImageModel = Backbone.Model.extend({
		initialize:function(obj){
			// console.log(obj)
		}
	})
	// 千万不要忘记暴露接口
	return ImageModel;
})
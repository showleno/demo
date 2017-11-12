define(['backbone','zepto','underscore','css!detail/detail.css'], function(Backbone, $, _){
	return Backbone.View.extend({
		tpl:_.template($("#detail_tpl").html()),
		render: function(id){
			var model = this.collection.get(id);
			if (!model) {
				Backbone.history.location.replace('#')
				return;
			};
			var data = {
				img:'img/detail/'+ model.get('foodImg'),
				floor:model.get('floor'),
				title: model.get('title'),
				style:model.get('evaluate'),
				address:model.get('address'),
				price: model.get('price'),
				salesOne: 'img/detail/'+(model.get('salesOne') ? model.get('salesOne') : model.get('url')),
				salesTwo: 'img/detail/'+(model.get('salesTwo') ? model.get('salesTwo') : model.get('url'))
			}
			var dom = this.$('#detail');
			// dom.html(this.tpl(this.model.attributes))
			var html = this.tpl(data);
			dom.html(html);
		}
	})
})
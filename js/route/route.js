define(["backbone",
	"zepto",
	"home/ad/ad",
	"collection/home/ad",
	"home/menu/menu",
	"collection/home/menu",
	"home/footer/footer",
	"collection/home/footer",
	"list/list",
	"collection/list/list",
	"detail/detail",
	"collection/detail/detail"], function(Backbone, $, HomeAd, AdCollection, HomeMenu, MenuCollection, Footer, FooterCollection, List, ListCollection, Detail, DetailCollection){
	
	// 实例化集合
	var adCollection = new AdCollection();
	var menuCollection = new MenuCollection();
	var footerCollection = new FooterCollection();
	var listCollection = new ListCollection();
	var detailCollection = new DetailCollection();
	// 实例化视图
	var home_menu = new HomeMenu({
		el:"#app",
		collection:menuCollection
	});
	var home_ad = new HomeAd({
		el:"#app",
		collection:adCollection
	});
	var list = new List({
		el:"#app",
		collection: listCollection
	});
	var footer = new Footer({
		el:"#app",
		collection:footerCollection
	});
	var detail = new Detail({
		el:"#app",
		collection: listCollection
	});
	//路由拓展类
	var Router = Backbone.Router.extend({
		routes:{
			"list":"showList",
			"detail/:id":"showDetail",
			// "home":"showHome",
			"*other":"showHome"
		},
		changeFootIcon: function(element,positionX,positionY){
			console.log(element)
			$('.pageLink i').css({
				"backgroundPositionY":"0",
			})
			$("."+element).css({
				"backgroundPosition":positionX+"px "+positionY+"px",
			})
			$("."+element).parent().parent().addClass("active").siblings().removeAttr('class');
		},
		showHome: function(){
			this.changeFootIcon("home",0,-25);
			list.$(".listPage").hide();
			list.$('.content').show();
			home_ad.$('.salePaper').show();
			home_menu.$('.menu').show();
			$('.topBar').show();
			detail.$('.detail').hide();
		},
		showList: function(){
			this.changeFootIcon("sale",-27,-25);
			list.$('.content').hide();
			list.$(".listPage").show();
			home_ad.$('.salePaper').hide();
			home_menu.$('.menu').hide();
			$('.topBar').show();
		},
		showDetail: function(id){
			$('.pageLink i').css({
				"backgroundPositionY":"0",
			})
			detail.$('.detail').show();
			$('.pageLink li').removeAttr('class');
			list.$('.content').hide();
			home_ad.$('.salePaper').hide();
			home_menu.$('.menu').hide();
			list.$('.listPage').hide();
			$('.topBar').hide();
			detail.render(id);
		}
	})
	new Router();
	//返回接口
	return function(){
		Backbone.history.start();
	}
})
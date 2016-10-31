(function(){
	var Model=function(config){
		var me=this;
		me.options=config;
		me.ct=config.ct;
		var calStyle=document.defaultView.getComputedStyle(me.ct,null);//获得样式对象
		me.imgWidth=parseInt(calStyle.width);
		me.imgHeight=parseInt(calStyle.height);
		me.init();
	}
	Model.prototype.init=function(){
		var me=this;
		//初始化wrapper
		me.wrapper=document.createElement("div");
		me.wrapper.className="wrapper";
		me.wrapper.style.width=me.options.imgs.length*me.imgWidth+"px";
		me.ct.appendChild(me.wrapper);
		
		for(var i=0;i<me.options.imgs.length;i++){
			var img=new Image();
			img.src=me.options.imgs[i];
			img.style.width=me.imgWidth+"px";
			img.style.height=me.imgHeight+"px";
			me.wrapper.appendChild(img);
		}
		
		var circlect=document.createElement("div");
		circlect.className="circlect";
		var inner=document.createElement("div");
		inner.className="inner";
		circlect.appendChild(inner);
		for(var i=0;i<me.options.imgs.length;i++){
			var span=document.createElement("span");
			span.className="circle";
			inner.appendChild(span);
		}
		inner.firstChild.className="circle circle-cur";
		me.inner=inner;
		me.ct.appendChild(circlect);
	}
	Model.prototype.moveLeft=function(){
		
	}
	Model.prototype.moveRight=function(){
		
	}
	
	window.SlideImg=Model;
}());

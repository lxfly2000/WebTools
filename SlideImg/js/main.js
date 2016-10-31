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
		
		me.currentImgNum=0;
		me.imgs=[];
		for(var i=0;i<me.options.imgs.length;i++){
			var img=new Image();
			img.src=me.options.imgs[i];
			img.style.width=me.imgWidth+"px";
			img.style.height=me.imgHeight+"px";
			img.className="wrapper";
			me.wrapper.appendChild(img);
			me.imgs[i]=img;
		}
		
		var circlect=document.createElement("div");
		circlect.className="circlect";
		var inner=document.createElement("div");
		inner.className="inner";
		circlect.appendChild(inner);
		me.circles=[];
		for(var i=0;i<me.options.imgs.length;i++){
			var span=document.createElement("span");
			span.className="circle";
			inner.appendChild(span);
			me.circles[i]=span;
		}
		inner.firstChild.className="circle circle-cur";
		me.inner=inner;
		me.ct.appendChild(circlect);
		
		me.ct.buttonLeft=document.createElement("button");
		me.ct.buttonLeft.className="btn btn-left";
		me.ct.buttonLeft.innerHTML="&lt;";
		me.ct.appendChild(me.ct.buttonLeft);
		me.ct.buttonRight=document.createElement("button");
		me.ct.buttonRight.className="btn btn-right";
		me.ct.buttonRight.innerHTML="&gt;";
		me.ct.appendChild(me.ct.buttonRight);
		
		me.ct.buttonLeft.addEventListener("click",function(e){
			me.moveLeft();
		});
		me.ct.buttonRight.addEventListener("click",function(e){
			me.moveRight();
		});
	}
	Model.prototype.moveLeft=function(){
		var me=this;
		if(me.currentImgNum==0)return;
		me.circles[me.currentImgNum].className="circle";
		me.circles[me.currentImgNum-1].className="circle circle-cur";
		me.currentImgNum--;
		for(var i=0;i<me.options.imgs.length;i++){
			me.imgs[i].style.transform="translate(-"+me.imgWidth*me.currentImgNum+"px,0px)";
		}
	}
	Model.prototype.moveRight=function(){
		var me=this;
		if(me.currentImgNum+1==me.options.imgs.length)return;
		me.circles[me.currentImgNum].className="circle";
		me.circles[me.currentImgNum+1].className="circle circle-cur";
		me.currentImgNum++;
		for(var i=0;i<me.options.imgs.length;i++){
			me.imgs[i].style.transform="translate(-"+me.imgWidth*me.currentImgNum+"px,0px)";
		}
	}
	
	window.SlideImg=Model;
}());

(function(){
	var Model=function(){
		var me=this;
		me.container=document.querySelector("#container");
		me.image=me.container.querySelector("img");
		me.scale=1;
		me.startX=0;
		me.startY=0;
		me.initEvent();
	}
	
	Model.prototype.bigger=function(){
		var me=this;
		me.scale+=0.1;
		me.updTransform();
	}
	
	Model.prototype.smaller=function(){
		var me=this;
		me.scale-=0.1;
		me.updTransform();
	}
	
	Model.prototype.updTransform=function(){
		var me=this;
		me.image.style.transform="scale("+me.scale+","+me.scale+") translate("+me.startX+"px,"+me.startY+"px)";//CSS3属性
	}
	
	Model.prototype.initEvent=function(){
		var me=this;
		me.container.addEventListener("mousedown",function(e){
			me.oldPoint={x:e.clientX,y:e.clientY};
		});
		me.container.addEventListener("mouseup",function(e){
			me.oldPoint=undefined;
		});
		me.container.addEventListener("mousemove",function(e){
			if(me.oldPoint==undefined){
				return;
			}
			me.startX+=e.clientX-me.oldPoint.x;
			me.startY+=e.clientY-me.oldPoint.y;
			me.updTransform();
			me.oldPoint={x:e.clientX,y:e.clientY};
		});
	}
	
	Model.prototype.crop=function(){
		var me=this;
		var x=((me.image.offsetWidth*(me.scale-1)/2+150)/me.scale-me.startX)|0;
		var y=((me.image.offsetWidth*(me.scale-1)/2+50)/me.scale-me.startY)|0;
		var w=(300/me.scale)|0;
		var h=(300/me.scale)|0;
		
		var canvas=document.querySelector("canvas");
		var ctx=canvas.getContext("2d");
		ctx.clearRect(0,0,300,300);
		ctx.drawImage(me.image,x,y,w,h,0,0,300,300);
	}
	
	window.ImageEditor=Model;
}());

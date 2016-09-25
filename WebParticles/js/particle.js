// JavaScript Document
(function(){
	var Model=function(canvas)//这个叫函数表达式
	{
		this.canvas=canvas;
		this.context=canvas.getContext('2d');//单双引号均可
		
		this.particlesNumber=100;
		this.particles=[];//方括号表示数组
		this.original_x=this.canvas.width/2;
		this.original_y=this.canvas.height/2;
		this.canvas.addEventListener('click',this.MouseClick);
		this.initParticles();
		this.explode();
	}
	
	Model.prototype.MouseClick=function(e){
		Game.original_x=e.offsetX;
		Game.original_y=e.offsetY;
	}
	
	Model.prototype.initParticles=function()
	{
		for(var i=0;i<this.particlesNumber;i++)
			this.particles[i]=this.genParticle();
	}
	
	Model.prototype.genParticle=function()
	{
		var p=
		{
			x:this.original_x,
			y:this.original_y,
			radius:Math.round(Math.random()*20),
			
			r:Math.round(Math.random()*255),
			g:Math.round(Math.random()*255),
			b:Math.round(Math.random()*255),
			a:1,
			lose_a:Math.random()/2+0.001,
			
			angle:Math.random()*Math.PI*2,
			v:50+Math.random()*200,
			v_acc:Math.random()
		}
		return p;
	}
	
	Model.prototype.explode=function()
	{
		var me = this;
		ctx=me.context;//临时变量
		ctx.globalCompositeOperation="lighter";
		
		function draw()
		{
			ctx.clearRect(0,0,me.canvas.width,me.canvas.height);
			ctx.fillStyle="#000000";
			ctx.fillRect(0,0,me.canvas.width,me.canvas.height);

			for(var i in me.particles)
			{
				var part=me.particles[i];
				ctx.fillStyle='rgba('+part.r+','+part.g+','+part.b+','+part.a+')';
				
				ctx.beginPath();
				ctx.arc(part.x,part.y,part.radius,0,360);
				ctx.fill();
				ctx.closePath();
				
				part.x+=part.v*Math.cos(part.angle)*0.03;
				part.y+=part.v*Math.sin(part.angle)*0.03;
				
				if(part.v>0)
					part.v-=part.v_acc;
				else
					part.v=0;
				part.a-=part.lose_a;
				
				if(part.a<0)
					me.particles[i]=me.genParticle();
			}
			ctx.fillStyle="black";
			ctx.globalCompositeOperation="dark";
			ctx.beginPath();
			ctx.arc(me.canvas.width/2, me.canvas.height/2,100,0,360);
			ctx.fill();
			ctx.closePath();
			ctx.globalCompositeOperation="lighter";

			setTimeout(draw,30);
		}
		draw();
	}
	
	Model.prototype.ClearParticles=function(){
		this.initParticles();
	}
	
	window.Fireworks=Model;
}());

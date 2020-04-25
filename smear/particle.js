// JavaScript Document
class Fireworks{
	constructor(canvas)//这个叫函数表达式
	{
		this.canvas=canvas;
		this.context=canvas.getContext('2d');//单双引号均可
		
		this.smear=false;
		this.particlesNumber=400;
		this.particleSpeed=2;
		this.particles=[];//方括号表示数组
		this.original_x=this.canvas.width/2;
		this.original_y=this.canvas.height/2;
		this.canvas.addEventListener('mousemove',this.MouseClick);
		this.initParticles();
		this.explode();
	}
	
	ToggleSmear(){
		this.smear=document.getElementById("checkSmear").checked;
		this.ClearParticles();
	}
	
	MouseClick(e){
		Game.original_x=e.offsetX;
		Game.original_y=e.offsetY;
	}
	
	initParticles()
	{
		for(var i=0;i<this.particlesNumber;i++){
			this.particles[i]=this.genParticle();
			this.particles[i].a=i/this.particlesNumber;
		}
		this.lastParticleIndex=this.particlesNumber-1;
	}
	
	genParticle()
	{
		var p=
		{
			x:this.original_x,
			y:this.original_y,
			radius:20,
			
			r:Math.round(Math.random()*255),
			g:Math.round(Math.random()*255),
			b:Math.round(Math.random()*255),
			a:1,
			lose_a:this.smear?Math.random()/2+0.001:0.01,
			
			angle:Math.random()*Math.PI*2,
			v:0,
			v_acc:Math.random()
		}
		return p;
	}
	
	static draw(pObj)
	{
		var ctx=pObj.context;
		ctx.clearRect(0,0,pObj.canvas.width,pObj.canvas.height);
		ctx.fillStyle="#000000";
		ctx.fillRect(0,0,pObj.canvas.width,pObj.canvas.height);

		for(var i in pObj.particles)
		{
			var part=pObj.particles[i];
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
			
			if(part.a<0){
				pObj.particles[i]=pObj.genParticle();
				var dx=pObj.particles[i].x-pObj.particles[pObj.lastParticleIndex].x;
				var dy=pObj.particles[i].y-pObj.particles[pObj.lastParticleIndex].y;
				var distance=Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
				var theta=Math.atan2(dy,dx);
				if(distance>pObj.particleSpeed){
					pObj.particles[i].x=pObj.particles[pObj.lastParticleIndex].x+pObj.particleSpeed*Math.cos(theta);
					pObj.particles[i].y=pObj.particles[pObj.lastParticleIndex].y+pObj.particleSpeed*Math.sin(theta);
				}
				pObj.lastParticleIndex=i;
			}
		}
		ctx.fillStyle="black";
		ctx.globalCompositeOperation="dark";
		ctx.beginPath();
		ctx.arc(pObj.canvas.width/2, pObj.canvas.height/2,100,0,360);
		ctx.fill();
		ctx.closePath();
		ctx.globalCompositeOperation="lighter";

		setTimeout(Fireworks.draw,30,pObj);
	}
	
	explode()
	{
		this.context.globalCompositeOperation="lighter";
		
		Fireworks.draw(this);
	}
	
	ClearParticles(){
		this.initParticles();
	}
}

(function()
{
	var Model=function(canvas){
		var me=this;
		me.canvas=canvas;
		me.context=canvas.getContext('2d');
		me.context.font="40px \"Microsoft Yahei\",sans-serif";
		
		me.cols=4;//lie
		me.rows=6;
		me.totalRows=30;
		me.bricks=[];
		me.brickWidth=me.canvas.width/me.cols;
		me.brickHeight=me.canvas.height/me.rows;
		me.Reset();
		
		//Reg EL
		me.canvas.addEventListener('click',function(e)
		{
			if(me.gameok==false)return;
			var status=me.getClickedBrick(e);
			//if clicked the Black
			if(status==1){
				me.goforwardOneBlock();
			}else if(status==0){
				me.gameOver();
			}
		});
	}
	
	Model.prototype.goforwardOneBlock=function(){
		this.score+=1;
		this.bricks.pop();
		this.bricks.unshift(Math.random()*4 | 0);
		this.drawMain();
	}
	
	Model.prototype.getClickedBrick=function(e){
		var me=this;
		
		var colIndex=e.offsetX/me.brickWidth |0;
		var rowIndex=e.offsetY/me.brickHeight |0;
		
		if(me.bricks[rowIndex]==colIndex){
			if(rowIndex==me.rows-1){
				return 1;			
			}else{
				return 2;
			}
		}else{
			return 0;
		}
	}
	
	Model.prototype.brickInit=function(){
		var me=this;
		for(var i=0;i<me.rows;i++){
			me.bricks[i]=Math.random()*4 | 0;
			
		}
	}
	Model.prototype.drawBricks=function(){
		var me=this;
		var ctx=me.context;
		
		ctx.fillStyle='black';
		for(var i=0;i<me.rows;i++){
			ctx.fillRect(me.brickWidth*me.bricks[i],i*me.brickHeight,me.brickWidth,me.brickHeight);
		}
	}
	Model.prototype.drawMain=function(){
		var me=this;
		me.context.clearRect(0,0,me.canvas.width,me.canvas.height);
		me.drawGrid();
		me.drawBricks();
		me.context.fillStyle="green";
		me.context.fillText(me.score.toString(),10,40);
	}
	
	Model.prototype.drawGrid=function(){
		var me=this;
		var ctx=me.context;
		ctx.strokeStyle='red';
		ctx.beginPath();
		for(var i=0;i<=me.rows;i++){
			var y=me.brickHeight*i;
			ctx.moveTo(0,y);
			ctx.lineTo(me.canvas.width,y);
		}
		for(var i=0;i<=me.cols;i++){
			var x=me.brickWidth*i;
			ctx.moveTo(x,0);
			ctx.lineTo(x,me.canvas.height);
		}
		ctx.stroke();
		ctx.closePath();
	}
	
	Model.prototype.Reset=function(){
		this.gameok=true;
		this.score=0;
		this.brickInit();
		this.drawMain();
	}
	
	Model.prototype.gameOver=function(){
		this.gameok=false;
		alert("你踩到了白块。");
	}
	
	window.Brick=Model;
}());

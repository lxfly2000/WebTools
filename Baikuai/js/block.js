(function(){
	var Model=function(container){
		var me=this;
		me.container=container;
		
		me.createBlock();
		me.blockArr=[];
		me.toBeErase=30;
		me.erased=0;
		me.gameok=true;
		me.initBlock();
		me.updateBlock();
		me.container.addEventListener('click',function(e){
			if(me.gameok==false)return;
			var node=e.target;
			var r=me.checkBlock(node);
			if(r==0){
				me.gameok=false;
				alert("白块。");
			}else if(r==2){
				me.blockArr.pop();
				if(++me.erased>=me.toBeErase-5){
					me.blockArr.unshift(-1);
				}else{
					me.blockArr.unshift(Math.random()*4|0);
				}
				me.updateBlock();
				if(me.erased==me.toBeErase){
					me.gameok=false;
					alert("End.");
				}
			}
		});
	}
	
	//更新黑块
	Model.prototype.updateBlock=function(){
		var me=this;
		var nodes=me.container.childNodes;
		var index;
		for(var i=0;i<6;i++){
			index=me.blockArr[i];
			for(var j=0;j<4;j++){
				if(j==index){
					nodes[4*i+j].setAttribute("class","blackBlock");
				}else{
					nodes[4*i+j].setAttribute("class","whiteBlock");
				}
			}
		}
	}
	
	//初始化Block
	Model.prototype.createBlock=function(){
		var me=this;
		for(var i=0;i<6;i++)
		{
			for(var j=0;j<4;j++)
			{
				var div=document.createElement("div");//动态创建标签
				div.setAttribute("class","whiteBlock");
				me.container.appendChild(div);
			}
		}
	}
	
	Model.prototype.initBlock=function(){
		for(var i=0;i<6;i++){
			this.blockArr[i]=Math.random()*4 | 0;//取整数
		}
	}
	
	/* 检查点击块
	 * @param node: 传入的
	 * @return 0 白块
	 *         1 非最后行黑块
	 *         2 最后行黑块
	 */
	Model.prototype.checkBlock=function(node){
		var me=this;
		var nodes=me.container.childNodes;
		for(var i=0;i<6;i++){
			if(nodes[i*4+me.blockArr[i]]==node){
				if(i==5)return 2;
				else return 1;
			}
		}
		return 0;
	}
	
	Model.prototype.ResetGame=function(){
		this.initBlock();
		this.updateBlock();
		this.erased=0;
		this.gameok=true;
	}
	
	//使其可见
	window.WhiteBlock=Model;
}());

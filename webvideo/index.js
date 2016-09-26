(function(){
	var Model=function(){
		var me=this;
		me.getData("data.json",function(r){
			var json=JSON.parse(r);
			me.genList(json);
		});
		
		document.querySelector('ul').addEventListener('click',function(e){
			document.querySelector('video').setAttribute('src',e.target.dataset.url);
		});
	}
	
	/*
	 * 读取数据：
	 * @param url: 地址
	 * @param callback: 回调
	 */
	Model.prototype.getData=function(url, callback){
		var xhr=new XMLHttpRequest();
		xhr.open("GET",url,true);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){//服务器有响应
				if(xhr.status==200){//服务器正确响应
					if(typeof callback=='function'){
						callback(xhr.responseText);
					}
				}
			}
		}
		//发送请求
		xhr.send(null);
	}
	
	/*
	 * 产生播放列表
	 * @param data 播放数据
	 */
	Model.prototype.genList=function(data){
		var me=this;
		var rows=data.rows;/*data['rows']也可*/
		var ul=document.querySelector('ul');
		for(var i=0;i<rows.length;i++){
			var o= rows[i];
			var li=document.createElement('li');
			li.dataset.url=o.url;
			li.innerHTML=o.title;
			ul.appendChild(li);
		}
	}
	
	window.VideoPlayer=Model;
}());

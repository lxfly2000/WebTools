(function(){
	var Model=function(){
		var me=this;
		me.initDate();
		me.initArea();
		
		me.texts=document.querySelectorAll("[type='text']");
		me.tips=document.querySelectorAll(".tip");
		for(var i=0;i<me.texts.length;i++){
			me.texts[i].i_index=i;
		}
		me.texts.forEach(function(t){
			t.addEventListener("blur",function(){
				var retStr=me.checkValid(t.getAttribute("check"),t.value);
				if(retStr!=null){
					me.tips[t.i_index].innerHTML=retStr;
					me.correct[t.i_index]=false;
				}else{
					me.tips[t.i_index].innerHTML="";
					me.correct[t.i_index]=true;
				}
			});
		});
		me.correct=new Array(me.texts.length);
		for(var i=0;i<me.correct.length;i++)me.correct[i]=false;
		
		document.querySelector("#submitbutton").addEventListener("click",function(){
			me.submit();
		});
		me.tagName=document.querySelector("[name='nickName']");
		me.tagPassword=document.querySelector("[name='pwd']");
		me.tagPhone=document.querySelector("[name='phoneNum']");
		me.divSex=document.querySelector("#sexgroup");
		
		document.querySelectorAll("[name='sex']").forEach(function(r){
			r.addEventListener("click",function(){
				me.divSex.value=r.value;
			});
		});
	}
	
	Model.prototype.initDate=function(){
		var me=this;
		me.tagYear=document.querySelector("[name='birthYear']");
		me.tagMonth=document.querySelector("[name='birthMonth']");
		me.tagDate=document.querySelector("[name='birthDay']");
		
		var shtml='';
		for(var i=1990;i<2100;i++){
			shtml+="<option value='"+i+"'>"+i+"年</option>";
		}
		me.tagYear.innerHTML=shtml;
		shtml='';
		for(var i=1;i<=12;i++){
			shtml+="<option value='"+i+"'>"+i+"月</option>";
		}
		me.tagMonth.innerHTML=shtml;
		me.tagYear.addEventListener("change",function(){
			updateDate();
		});
		me.tagMonth.addEventListener("change",function(){
			updateDate();
		});
		
		function updateDate(){
			var vy=parseInt(me.tagYear.value);
			var vm=parseInt(me.tagMonth.value);
			var days=31;
			
			if(vm==2){
				if((vy%4==0&&vy%100!=0)||(vy%400==0))days=29;
				else days=28;
			}else if(vm==4||vm==6||vm==9||vm==11){
				days=30;
			}
			shtml='';
			for(var i=1;i<=days;i++){
				shtml+="<option value='"+i+"'>"+i+"日</option>";
			}
			me.tagDate.innerHTML=shtml;
		}
	}
	
	Model.prototype.initArea=function(){
		var me=this;
		var countries=['中国','美国','法国','德国','英国','俄罗斯'];
		var provinces={
			'中国':['北京','上海','四川','重庆'],
			'美国':['华盛顿','纽约','洛杉矶'],
			'法国':['比利时','布鲁塞尔','巴黎'],
			'德国':['柏林','慕尼黑'],
			'英国':['伦敦','剑桥','泰晤士','威尔士'],
			'俄罗斯':['莫斯科','圣彼得堡','海参崴']
		};
		var cities={
			'北京':['海淀区','密云县'],
			'上海':['虹桥','浦东'],
			'四川':['成都','绵阳','德阳'],
			'重庆':['重庆']
		};
		
		me.tagCountry=document.querySelector("[name='country']");
		me.tagProvince=document.querySelector("[name='province']");
		me.tagCity=document.querySelector("[name='city']");
		
		var shtml="";
		for(var i=0;i<countries.length;i++){
			shtml+="<option value='"+countries[i]+"'>"+countries[i]+"</option>";
		}
		me.tagCountry.innerHTML=shtml;
		
		me.tagCountry.addEventListener("change",function(){
			var vc=me.tagCountry.value;
			me.tagProvince.innerHTML="";
			me.tagCity.innerHTML="";
			var shtml_province="";
			var dataset=provinces[vc];
			if(dataset!=undefined){
				for(var i=0;i<dataset.length;i++){
					shtml_province+="<option value='"+dataset[i]+"'>"+dataset[i]+"</option>";
				}
				me.tagProvince.innerHTML=shtml_province;
			}
		});
		
		me.tagProvince.addEventListener("change",function(){
			var vc=me.tagProvince.value;
			me.tagCity.innerHTML="";
			var shtml_city="";
			var dataset=cities[vc];
			if(dataset!=undefined){
				for(var i=0;i<dataset.length;i++){
					shtml_city+="<option value='"+dataset[i]+"'>"+dataset[i]+"</option>";
				}
				me.tagCity.innerHTML=shtml_city;
			}
		});
	}
	
	Model.prototype.checkValid=function(typeStr,val){
		var validObj={
			empty:function(){
				return val!="";
			},
			mobile:function(){
				var reg=new RegExp(/^1[3578]\d{9}$/);//正则表达式，验证手机号
				return reg.test(val);
			},
			repw:function(){
				return val==document.querySelector("[name='pwd']").value;
			}
		}
		var msgObj={
			empty:"不能为空",
			mobile:"手机号错误",
			repw:"密码不一致"
		};
		
		var arg=typeStr.split("|");
		for(var i=0;i<arg.length;i++){
			if(typeof validObj[arg[i]]=="function"){
				if(validObj[arg[i]]()==false)return msgObj[arg[i]];
			}
		}
		return null;
	}
	
	Model.prototype.submit=function(){
		var me=this;
		for(var i=0;i<me.texts.length;i++){
			if(me.correct[i]==false){
				alert("你输入的信息有错。");
				return;
			}
		}
		var str="昵称："+me.tagName.value+"\n密码："+me.tagPassword.value+"\n手机号码："+me.tagPhone.value;
		str+="\n性别："+me.divSex.value;
		str+="\n生日："+me.tagYear.options[me.tagYear.selectedIndex].text+me.tagMonth.options[me.tagMonth.selectedIndex].text+me.tagDate.options[me.tagDate.selectedIndex].text;
		str+="\n地址："+me.tagCountry.options[me.tagCountry.selectedIndex].text;
		if(me.tagProvince.selectedIndex!=-1)str+=","+me.tagProvince.options[me.tagProvince.selectedIndex].text;
		if(me.tagCity.selectedIndex!=-1)str+=","+me.tagCity.options[me.tagCity.selectedIndex].text;
		alert(str);
	}
	
	window.qqregist=Model;
}());

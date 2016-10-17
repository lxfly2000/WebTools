(function(){
	var Model=function(){
		this.initDate();
		this.initArea();
		
		var texts=document.querySelectorAll("[type='text']");
		texts.forEach(function(t){
			t.addEventListener("blur",function(){
				var retStr=this.checkValid(t.plusGetAttribute("check"),t.value);
				if(retStr!=null){
					t.nextSibling.nextSibling.innerHTML=retStr;
				}else{
					t.nextSibling.nextSibling.innerHTML="";
				}
			});
		});
	}
	
	Model.prototype.initDate=function(){
		var tagYear=document.querySelector("[name='birthYear']");
		var tagMonth=document.querySelector("[name='birthMonth']");
		var tagDate=document.querySelector("[name='birthDay']");
		
		var shtml='';
		for(var i=1990;i<2100;i++){
			shtml+="<option value='"+i+"'>"+i+"年</option>";
		}
		tagYear.innerHTML=shtml;
		shtml='';
		for(var i=1;i<=12;i++){
			shtml+="<option value='"+i+"'>"+i+"月</option>";
		}
		tagMonth.innerHTML=shtml;
		tagYear.addEventListener("change",function(){
			updateDate();
		});
		tagMonth.addEventListener("change",function(){
			updateDate();
		});
		updateCity();
		
		function updateDate(){
			var vy=parseInt(tagYear.value);
			var vm=parseInt(tagMonth.value);
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
			tagDate.innerHTML=shtml;
		}
		
		function updateCity(){
			
		}
	}
	
	Model.prototype.initArea=function(){
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
		
		var tagCountry=document.querySelector("[name='country']");
		var tagProvince=document.querySelector("[name='province']");
		var tagCity=document.querySelector("[name='city']");
		
		var shtml="";
		for(var i=0;i<countries.length;i++){
			shtml+="<option value='"+countries[i]+"'>"+countries[i]+"</option>";
		}
		tagCountry.innerHTML=shtml;
		
		tagCountry.addEventListener("change",function(){
			var vc=tagCountry.value;
			tagProvince.innerHTML="";
			tagCity.innerHTML="";
			var shtml_province="";
			var dataset=provinces[vc];
			if(dataset!=undefined){
				for(var i=0;i<dataset.length;i++){
					shtml_province+="<option value='"+dataset[i]+"'>"+dataset[i]+"</option>";
				}
				tagProvince.innerHTML=shtml_province;
			}
		});
		
		tagProvince.addEventListener("change",function(){
			var vc=tagProvince.value;
			tagCity.innerHTML="";
			var shtml_city="";
			var dataset=cities[vc];
			if(dataset!=undefined){
				for(var i=0;i<dataset.length;i++){
					shtml_city+="<option value='"+dataset[i]+"'>"+dataset[i]+"</option>";
				}
				tagCity.innerHTML=shtml_city;
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
			}
		}
		var msgObj={
			empty:"不能为空",
			mobile:"手机号错误"
		};
		
		var arg=typeStr.split("|");
		for(var i=0;i<arg.length;i++){
			if(typeof validObj[v]=="function"){
				if(validObj[v]()==false)return msgObj[v];
			}
		}
		return null;
	}
	
	window.qqregist=Model;
}());

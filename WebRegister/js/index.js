(function(){
	var Model=function(){
		this.initDate();
	}
	
	Model.prototype.initDate=function(){
		var tagYear=document.querySelector("[name='birthYear']");
		var tagMonth=document.querySelector("[name='birthMonth']");
		var tagDate=document.querySelector("[name='birthDay']");
		var tagCountry=document.querySelector("[name='country']");
		var tagProvince=document.querySelector("[name='province']");
		var tagCity=document.querySelector("[name='city']");
		
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
		tagYear.addEventListener('change',function(){
			updateDate();
		});
		tagMonth.addEventListener('change',function(){
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
	
	window.qqregist=Model;
}());

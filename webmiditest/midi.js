//https://webaudio.github.io/web-midi-api/
(function(){
	var keyToNote=[
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0x4b,//0
		0,//1
		0x3d,//2
		0x3f,//3
		0,//4
		0x42,//5
		0x44,//6
		0x46,//7
		0,//8
		0x49,//9
		0,0,0,0,0,0,0,
		0,//A
		0x37,//B
		0x34,//C
		0x33,//D
		0x40,//E
		0,//F
		0x36,//G
		0x38,//H
		0x48,//I
		0x3a,//J
		0,//K
		0x3d,//L
		0x3b,//M
		0x39,//N
		0x4a,//O
		0x4c,//P
		0x3c,//Q
		0x41,//R
		0x31,//S
		0x43,//T
		0x47,//U
		0x35,//V
		0x3e,//W
		0x32,//X
		0x45,//Y
		0x30,//Z
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0x3f,//分号
		0x4e,//等号
		0x3c,//逗号
		0,//-
		0x3e,//点
		0x40,//斜杠
		0,//`
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0x4d,//左中括号
		0,//反斜杠
		0x4f,//右中括号
		0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
	];
	
	var Model=function(){//创建对象时执行的函数
		if(navigator&&typeof(eval(navigator.requestMIDIAccess)) == "function"){
			navigator.requestMIDIAccess({sysex:false}).then(this.onMIDISuccess,this.onMIDIFailure);//获取MIDI访问
			this.keyIsPressed=[];
			for(var i=0;i<256;i++)
				this.keyIsPressed[i]=false;
			document.onkeydown=function(e){
				if(keyToNote[e.keyCode]!=0&&!o.keyIsPressed[e.keyCode]){
					o.keyIsPressed[e.keyCode]=true;
					o.onKeyNote(0x90, keyToNote[e.keyCode], 0x7f);
				}
			}
			document.onkeyup=function(e){
				if(keyToNote[e.keyCode]!=0){
					o.keyIsPressed[e.keyCode]=false;
					o.onKeyNote(0x80, keyToNote[e.keyCode], 0x40);
				}
			}
		}
		else alert("当前浏览器不支持 MIDI, 请使用 Chrome 43 或 Opera 33 以上版本的浏览器。");
	}
	
	Model.prototype.onMIDISuccess=function(midiAccess){
		o.midi=midiAccess;
		if(this.midi!=null){
			alert("MIDI加载成功。");
		}
	}
	
	Model.prototype.onMIDIFailure=function(msg){
		alert("无法加载MIDI：\n"+msg);
	}
	
	Model.prototype.sendNote=function( midiAccess, portID, note ) {// note on, middle C, full velocity
		var output = midiAccess.outputs.get(portID);
		output.send( [0x90, note, 0x7f] );  //omitting the timestamp means send immediately.
        
		// Inlined array creation- note off, middle C,
		// release velocity = 64, timestamp = now + 1000ms.
		output.send( [0x80, note, 0x40], window.performance.now() + 1000.0 );
	}
	
	Model.prototype.onKeyNote=function(msgtype, key, velocity){
		o.midi.outputs.get(0).send([msgtype,key,velocity]);
	}
	
	Model.prototype.onCloseMidi=function(){
		alert("目前的 Web MIDI API 还不支持释放方法。");
	}
	
	Model.prototype.onSendMiddleC=function(){o.sendNote(o.midi,0,0x3c);}
	Model.prototype.onSendMiddleD=function(){o.sendNote(o.midi,0,0x3e);}
	Model.prototype.onSendMiddleE=function(){o.sendNote(o.midi,0,0x40);}
	Model.prototype.onSendMiddleF=function(){o.sendNote(o.midi,0,0x41);}
	Model.prototype.onSendMiddleG=function(){o.sendNote(o.midi,0,0x43);}
	Model.prototype.onSendMiddleA=function(){o.sendNote(o.midi,0,0x45);}
	Model.prototype.onSendMiddleB=function(){o.sendNote(o.midi,0,0x47);}
	
	window.MidiPlayer=Model;
}());

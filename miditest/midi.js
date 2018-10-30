//https://webaudio.github.io/web-midi-api/
(function(){
	var keyToNote=[
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x4b,0,0x3d,0x3f,0,0x42,0x44,
		0x46,0,0x49,0,0,0,0,0,0,0,0,0x37,0x34,0x33,0x40,0,0x36,0x38,0x48,
		0x3a,0,0x3d,0x3b,0x39,0x4a,0x4c,0x3c,0x41,0x31,0x43,0x47,0x35,
		0x3e,0x32,0x45,0x30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0x3f,0x4e,0x3c,0,0x3e,0x40,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x4d,0,0x4f,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
	];
	
	var Model=function(){//创建对象时执行的函数
		if(navigator&&typeof(eval(navigator.requestMIDIAccess)) == "function"){
			navigator.requestMIDIAccess({sysex:false}).then(this.onMIDISuccess,this.onMIDIFailure);//获取MIDI访问
			this.keyIsPressed=[];
			for(var i=0;i<128;i++)
				this.keyIsPressed[i]=false;
			this.currentOctave=4;
			this.currentChannel=0;//选择通道功能暂时不做了
			this.maxOctave=8;
			this.minOctave=1;
			for(var i=0;i<256;i++){
				if(keyToNote[i]!=0)
					keyToNote[i]-=12*this.currentOctave;
				else
					keyToNote[i]=-1;
			}
			this.maxProgram=127;
			this.minProgram=0;
			this.maxMSB=127;
			this.minMSB=0;
			this.maxLSB=127;
			this.minLSB=0;
			this.minChannel=0;
			this.maxChannel=15;
			document.addEventListener("keydown",function(e){o.onKeyNote(true, e.keyCode, 0x7f);});
			document.addEventListener("keyup",function(e){o.onKeyNote(false, e.keyCode, 0x40);});
			var curElem=document.getElementById("Octave");
			curElem.addEventListener("change",function(){
				o.SetOctave(parseInt(this.value));
			});
			curElem.value=this.currentOctave;
			curElem=document.getElementById("ProgramNum");
			curElem.addEventListener("change",function(){
				o.SetProgram(parseInt(this.value));
			});
			curElem.value=0;
			curElem=document.getElementById("BankMSB");
			curElem.addEventListener("change",function(){
				o.SetMSB(parseInt(this.value));
			});
			curElem.value=0;
			curElem=document.getElementById("BankLSB");
			curElem.addEventListener("change",function(){
				o.SetLSB(parseInt(this.value));
			});
			curElem.value=0;
			curElem=document.getElementById("ChannelNum");
			curElem.addEventListener("change",function(){
				o.SetChannel(parseInt(this.value));
			});
			curElem.value=0;
		}
		else alert("当前浏览器不支持 MIDI, 请使用 Chrome 43 或 Opera 33 以上版本的浏览器。");
	};
	
	Model.prototype.SetChannel=function(ch){
		this.currentChannel=ch;
		if(this.currentChannel<this.minChannel){
			this.currentChannel=this.minChannel;
			document.getElementById("ChannelNum").value=this.currentChannel;
		}
		if(this.currentChannel>this.maxChannel){
			this.currentChannel=this.maxChannel;
			document.getElementById("ChannelNum").value=this.maxChannel;
		}
	};
	
	Model.prototype.SetOctave=function(oct){
		this.currentOctave=oct;
		if(this.currentOctave<this.minOctave){
			this.currentOctave=this.minOctave;
			document.getElementById("Octave").value=this.currentOctave;
		}
		if(this.currentOctave>this.maxOctave){
			this.currentOctave=this.maxOctave;
			document.getElementById("Octave").value=this.maxOctave;
		}
	};
	
	Model.prototype.SetProgram=function(prg){
		if(prg<this.minProgram){
			prg=this.minProgram;
			document.getElementById("ProgramNum").value=this.minProgram;
		}
		if(prg>this.maxProgram){
			prg=this.maxProgram;
			document.getElementById("ProgramNum").value=this.maxProgram;
		}
		//参考 http://www.deqnotes.net/midi/winapi_midiprog/winapi_midiprog.pdf 第30页
		//第一字节0xC0为音色变换，第二字节为音色号
		o.midi.outputs.get(o.midiport.id).send([0xC0|this.currentChannel,prg]);
	};
	
	Model.prototype.SetMSB=function(msb){
		if(msb<this.minMSB){
			msb=this.minMSB;
			document.getElementById("BankMSB").value=this.minMSB;
		}
		if(msb>this.maxMSB){
			msb=this.maxMSB;
			document.getElementById("BankMSB").value=this.maxMSB;
		}
		//同上参考，第一字节0xB0为CC控制器，第二字节为CC号，0为MSB，第三字节为该CC的的的值
		o.midi.outputs.get(o.midiport.id).send([0xB0|this.currentChannel,0,msb]);
		//某些MIDI设备在修改子音色后需要再发送一次ProgramChange消息才能生效。
		o.SetProgram(document.getElementById("ProgramNum").value);
	};
	
	Model.prototype.SetLSB=function(lsb){
		if(lsb<this.minLSB){
			lsb=this.minLSB;
			document.getElementById("BankLSB").value=this.minLSB;
		}
		if(lsb>this.maxLSB){
			lsb=this.maxLSB;
			document.getElementById("BankLSB").value=this.maxLSB;
		}
		//同上参考，32为LSB
		o.midi.outputs.get(o.midiport.id).send([0xB0|this.currentChannel,32,lsb]);
		o.SetProgram(document.getElementById("ProgramNum").value);
	};
	
	Model.prototype.onMIDISuccess=function(midiAccess){
		o.midi=midiAccess;
		if(o.midi.outputs.size==0){
			alert("没有可用的 MIDI 设备。");
			return;
		}
		o.midiport=o.midi.outputs.values().next().value;
		if(midiAccess.outputs.get(o.midiport.id)==undefined){
			Model.prototype.sendNote=function(){};
			Model.prototype.onKeyNote=function(){};
			alert("Sorry, 这个版本的 Chrome 似乎出了点问题，导致 MIDI 消息无法发出。");
		}
		document.getElementById("InfoLine").innerHTML+=" - 使用设备："+o.midiport.name;
	};
	
	Model.prototype.onMIDIFailure=function(msg){
		alert("无法加载MIDI：\n"+msg);
	};
	
	Model.prototype.sendNote=function( midiAccess, note ) {// note on, middle C, full velocity
		var output = midiAccess.outputs.get(o.midiport.id);
		output.send( [0x90|this.currentChannel, note, 0x7f] );  //omitting the timestamp means send immediately.
        
		// Inlined array creation- note off, middle C,
		// release velocity = 64, timestamp = now + 1000ms.
		output.send( [0x80|this.currentChannel, note, 0x40], window.performance.now() + 1000.0 );
	};
	
	Model.prototype.onKeyNote=function(isNoteOn, keykbd, velocity){
		var pressedNote=keyToNote[keykbd];
		if(pressedNote==-1)return;
		pressedNote+=12*this.currentOctave;
		if(isNoteOn){
			if(!o.keyIsPressed[pressedNote]){
				o.keyIsPressed[pressedNote]=true;
				o.midi.outputs.get(o.midiport.id).send([0x90|this.currentChannel,pressedNote,velocity]);
			}
		}
		else{
			o.keyIsPressed[pressedNote]=false;
			o.midi.outputs.get(o.midiport.id).send([0x80|this.currentChannel,pressedNote,velocity]);
		}
	};
	
	Model.prototype.onSendNote=function(key){o.sendNote(o.midi,key);};
	
	window.MidiPlayer=Model;
}());

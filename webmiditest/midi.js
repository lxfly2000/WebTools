//https://webaudio.github.io/web-midi-api/
(function(){
	var Model=function(){//创建对象时执行的函数
		if(navigator&&typeof(eval(navigator.requestMIDIAccess)) == "function")
			navigator.requestMIDIAccess().then(this.onMIDISuccess,this.onMIDIFailure);//获取MIDI访问
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

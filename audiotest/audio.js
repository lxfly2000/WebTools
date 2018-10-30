var auContext;
var osc;
var isOn;
var _buttonSwitch, _slider, _editBox, _listShape;
var fqmin = 20, fqmax = 24000, fqcurrent = 440;
var oscType = [
	{
		"shape":"sine",
		"中文名称":"正弦"
	},
	{
		"shape":"square",
		"中文名称":"矩形"
	},
	{
		"shape":"sawtooth",
		"中文名称":"锯齿波"
	},
	{
		"shape":"triangle",
		"中文名称":"三角波"
	},
	{
		"shape":"custom",
		"中文名称":"自定义波形"//这里实际上是随机波形
	}
];

(function auInit(){
	try {
		auContext = new AudioContext();
	} catch(e) {
		alert("Audio API 在此浏览器中不受支持。");
		auContext = null;
		osc = null;
		return;
	}
	
	_buttonSwitch = document.getElementById("auSwitch");
	_slider = document.getElementById("freqSlider");
	_editBox = document.getElementById("freqNum");
	_listShape = document.getElementById("waveShape");
	_buttonSwitch.addEventListener("click", function(){
		ToggleSwitch(false);
	});
	_slider.setAttribute("min", fqmin);
	_slider.setAttribute("max", fqmax);
	_slider.addEventListener("change", function(){
		ChangeOscFreq(this.value);
	});
	_slider.setAttribute("value", fqcurrent);
	_editBox.setAttribute("min", fqmin);
	_editBox.setAttribute("max", fqmax);
	_editBox.addEventListener("change", function(){
		ChangeOscFreq(this.value);
	});
	_editBox.setAttribute("value", fqcurrent);
	for (var i = 0; i < oscType.length; i++){
		_listShape.innerHTML += "<option value='"+oscType[i]["shape"]+"'>"+oscType[i]["中文名称"]+"</option>";
	}
	_listShape.addEventListener("change", function(){
		ChangeOscWave(this.value);
	});
	_listShape.value = oscType[0]["shape"];
	
	ToggleSwitch(true);
}());

function ChangeOscWave(strWave){
	if (strWave == oscType[4]["shape"]){
		//参考：https://www.sitepoint.com/using-fourier-transforms-web-audio-api/
		//这个东西貌似要用到傅里叶变换、我不太懂、就乱写了一个。
		var _real = new Float32Array(12);
		var _imag = new Float32Array(_real.length);
		for (var i = 0; i < _real.length; i++){
			_real[i] = Math.random();
		}
		osc.setPeriodicWave(auContext.createPeriodicWave(_real, _imag));
	}else{
		osc.type = strWave;//搞不懂为什么AIDE里就可以一概设置而Chrome就得区分开？
	}
}

function ChangeOscFreq(f){
	fqcurrent = Math.max(Math.min(f, fqmax), fqmin);
	if (fqcurrent != f) alert("频率只能设置在 "+fqmin+"～"+fqmax+"Hz 间。");
	_editBox.value = fqcurrent;
	_slider.value = fqcurrent;
	osc.frequency.value = fqcurrent;
}

function StartOsc(){
	osc = auContext.createOscillator();
	ChangeOscWave(_listShape.value);
	ChangeOscFreq(fqcurrent);
	osc.connect(auContext.destination);
	osc.start();
	isOn = true;
}

function StopOsc(){
	osc.stop();
	isOn = false;
}

function ToggleSwitch(swreset){
	if (swreset)
		isOn = false;
	else
		isOn = !isOn;
	if (isOn){
		StartOsc();
		_buttonSwitch.value = "停止";
	}else{
		if (!swreset) StopOsc();
		_buttonSwitch.value = "播放";
	}
}

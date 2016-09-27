// ps:由于该程序很多是由基本数据来定义，所以很多函数和数据的复用不是很好，有很多优化的地方，但是基本功能已经实现，
// 数据和功能基本隔离，后续可以利用面向对象编程的思想来进行优化

// 首先定义事件处理函数

var EventUnit = {
	"addHandle": function(element,type,handle){
		if(element.addEventListener) {
			element.addEventListener(type,handle,false);
		} else 
		if (element.attachEvent) {
			element.attachEvent("on"+type,handle);
		} else {
			element["on"+type] = handle;
		}
	},
	"getEvent":function (event){
		return event?event:window.event;
	},
	"getTarget":function (event){
		return event.target||event.srcElement;
	}
};
// 定义保存数据数组
var tagList = [];
var hobbyList = [];

//初始数据
var tagInput=document.getElementById('tagInput');
var hobbyButton = document.getElementById('button_hobby');
var hobbyInput = document.getElementById('hobbyInput');
var hobbyShow = document.getElementById('hobbyShow');
var tagShow = document.getElementById('tagShow');

// tag的显示情况，如下定义：生成数组和展示数组

//下函数为将textarea中的数据处理成数组
function handleTextarea (textareaMessage){
	let str=textareaMessage.trim();
	let handleArry=str.split(/[^0-9a-zA-Z\u4E00-\u9FA5]+/).filter(function(e){
		let j = hobbyList.length;	
		if (e!=null&&e.length>0) {
			for (let i = 0; i < j; i++) {
				if (e == hobbyList[i]) {
					return false;
				}
			}
			return true;
		}else{
			return false;
		}
	});
	let momentArry=hobbyList.concat(handleArry);
	if (momentArry.length>10) {
		let flowNumber = momentArry.length-10;
		hobbyList = momentArry.slice(flowNumber);	
	}else{
		hobbyList = momentArry
	}
}
// 下函数为将tag input里的数据处理成数组
function handleTagInput (inputMessage){
	let str = inputMessage.trim();
	let j = tagList.length;
	let momentArry = tagList;
	for (var i = 0; i < j; i++) {
		if (str == tagList[i]) {
			return;
		}
	};
	momentArry.push(str);
	if (momentArry.length>10) {
		let overflowLength = momentArry.length-10;
		tagList = momentArry.slice(overflowLength);
		return;
	} else {
		tagList = momentArry;
		return;
	}
}
//下函数将数组处理成渲染数据，并且在页面中渲染
function arryHandle (arryInit,divShow) {
	let stringInput='';
	let arrylength=arryInit.length;
	for (let i=0;i<arrylength;i++){
		stringInput=stringInput+"<div data-index='"+i+"'>"+arryInit[i]+"</div>"
	}
	divShow.innerHTML=stringInput;
};
// 下函数监听button，触发函数
EventUnit.addHandle(hobbyButton,"click",function(event){
	let hobbyValue = hobbyInput.value;
	handleTextarea(hobbyValue);
	arryHandle(hobbyList,hobbyShow);
	hobbyInput.value = '';
});
// 下函数监听输入框事件
EventUnit.addHandle(tagInput,'keyup',function(event){
	let tagInputValue = tagInput.value.trim();
	var event = EventUnit.getEvent(event);
	var regx = /[,，;；、\s\n]+/;
	if (regx.test(tagInputValue) || event.keyCode ===13) {
		tagInputValue = tagInputValue.slice(0,-1);
		if (tagInputValue.length>0) {
			handleTagInput(tagInputValue);
			arryHandle(tagList,tagShow);
		}
	} else{
		return;
	}
	tagInput.value = '';
})


//删除函数
EventUnit.addHandle(hobbyShow,"click",function(event){
	event=EventUnit.getEvent(event);
	let target=EventUnit.getTarget(event);
	let targetValue = target.innerText;
	let index = hobbyList.indexOf(targetValue);
	if (index != -1) {
		hobbyList.splice(index,1);
		arryHandle(hobbyList,hobbyShow);

	}
})

EventUnit.addHandle(tagShow,"click",function(event){
	event=EventUnit.getEvent(event);
	let target=EventUnit.getTarget(event);
	let targetValue = target.innerText || target.textContent;
	let index = tagList.indexOf(targetValue);
	if (index != -1) {
		tagList.splice(index,1);
		arryHandle(tagList,tagShow);

	}
})
// 一些变量
var formId = document.getElementById('formTest');
var verifyButton = document.getElementById('verify');
// 铁打的ie
var EventUnit = {
	addEventHandle : function (element,type,handle) {
		if (element.addEventListener) {
			element.addEventListener(type,handle,false);
		} else if(element.attachEvent){
			element.attachEvent('on'+type,handle);
		} else {
			element['on'+type] = handle;
		}
	},
	getEvent : function(event) {
		return event?event : window.event;
	},
	getTarget : function(event) {
		return event.target || event.srcElement;
	},
	preventDefault : function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}
}

// 将样式转换抽象为一个函数，这样能省一些代码
function changeStyle (condition,element1,element2,element3) {
	if (condition) {
		element1.style.display = 'block';
		element2.style.display = 'none';
		element3.style.borderColor = 'green';
	} else {
		element1.style.display = 'none';
		element2.style.display = 'block';
		element3.style.borderColor = 'red';
	}
}

// 创建一个构造函数，返回几个DOM节点

// 验证函数
// function verifyFn (event){
	
// }

// 焦点聚集时候触发
EventUnit.addEventHandle(formId,'focus',function(event){
	let e = EventUnit.getEvent(event);
	let target = EventUnit.getTarget(e);
	let thisParent = target.parentNode;
	let inputElement = thisParent.getElementsByTagName('input')[0];
	let remindInputStyle = thisParent.getElementsByClassName('remind')[0];
	// let remindErrorStyle = thisParent.getElementsByClassName('theError')[0];
	// let remindSureStyle = thisParent.getElementsByClassName('theCorrect')[0];
	if (target.tagName.toUpperCase() != 'INPUT') {
		return;
	};
	remindInputStyle.style.display = 'block';
})

// 失去焦点时的
EventUnit.addEventHandle(formId,'blur',function(event) {
	let e = EventUnit.getEvent(event);
	let target = EventUnit.getTarget(e);
	let thisParent = target.parentNode;
	let inputElement = thisParent.getElementsByTagName('input')[0];
	let remindInputStyle = thisParent.getElementsByClassName('remind')[0];
	let remindErrorStyle = thisParent.getElementsByClassName('theError')[0];
	let remindSureStyle = thisParent.getElementsByClassName('theCorrect')[0];
	let blurObj = new GetElement(that);
	// 判断是不是点击的button，但是我觉得应该有更好的方法
	if (target.tagName.toUpperCase() != 'INPUT') {
		return;
	};
	remindInputStyle.style.display = 'none';
	// 表单验证
	switch(thisParent.id) {
		case 'lengthtext' :
			let lengthcond = Boolean(inputElement.value.trim().length > 4&&inputElement.value.trim().length<11);
			changeStyle(lengthcond,remindSureStyle,remindErrorStyle,inputElement);
			break;
		case 'nametest' :
			let nametestcond = Boolean(inputElement.value.trim().length > 0);
			changeStyle(nametestcond,remindSureStyle,remindErrorStyle,inputElement);
			break;
		case 'formattest' :
			let testStr = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
			let formattestcond = testStr.test(inputElement.value.trim());
			changeStyle(formattestcond,remindSureStyle,remindErrorStyle,inputElement);
			break;
		default:
			console.log('hava some error');
			break;
	}
});

EventUnit.addEventHandle(verifyButton,'click',function(event){

})
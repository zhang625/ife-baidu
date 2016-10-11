// // 一些变量
// var formId = document.getElementById('formTest');
// var verifyButton = document.getElementById('verify');
// var inputs = document.getElementsByTagName('input');
// var status = false;
// // 铁打的ie
// var EventUnit = {
// 	 addEventHandle : function (element,type,handle) {
// 		if (element.addEventListener) {
// 			element.addEventListener(type,handle,false);
// 		} else if(element.attachEvent){
// 			element.attachEvent('on'+type,handle);
// 		} else {
// 			element['on'+type] = handle;
// 		}
// 	}
// };

// // 将样式转换抽象为一个函数，这样能省一些代码
// function changeStyle (condition,element1,element2,element3) {
// 	if (condition) {
// 		element1.style.display = 'block';
// 		element2.style.display = 'none';
// 		element3.style.borderColor = 'green';
// 	} else {
// 		element1.style.display = 'none';
// 		element2.style.display = 'block';
// 		element3.style.borderColor = 'red';
// 	}
// }

// // 焦点聚集时的函数
// function blursFn (id){
// 	let thisParent = document.getElementById(id)
// 	let remindInputStyle = thisParent.getElementsByClassName('remind')[0];
// 	let remindErrorStyle = thisParent.getElementsByClassName('theError')[0];
// 	let remindSureStyle = thisParent.getElementsByClassName('theCorrect')[0];
// 	remindInputStyle.style.display = 'block';
// 	remindErrorStyle.style.display = 'none';
// 	remindSureStyle.style.display = 'none';
// }
// // 失去焦点时触发的验证函数
// function verifyFn (pId,cId){
// 	status = true;
// 	let thisParent = document.getElementById(pId);
// 	let inputElement = document.getElementById(cId);
// 	let remindInputStyle = thisParent.getElementsByClassName('remind')[0];
// 	let remindErrorStyle = thisParent.getElementsByClassName('theError')[0];
// 	let remindSureStyle = thisParent.getElementsByClassName('theCorrect')[0];
// 	remindInputStyle.style.display = 'none';
// 	// 表单验证
// 	switch(pId) {
// 		case 'lengthtext' :
// 			let lengthcond = Boolean(inputElement.value.trim().length > 4&&inputElement.value.trim().length<11);
// 			status = lengthcond;
// 			changeStyle(lengthcond,remindSureStyle,remindErrorStyle,inputElement);
// 			break;
// 		case 'nametest' :
// 			let nametestcond = Boolean(inputElement.value.trim().length > 0);
// 			status = nametestcond;
// 			changeStyle(nametestcond,remindSureStyle,remindErrorStyle,inputElement);
// 			break;
// 		case 'formattest' :
// 			let testStr = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
// 			let formattestcond = testStr.test(inputElement.value.trim());
// 			status = formattestcond;
// 			changeStyle(formattestcond,remindSureStyle,remindErrorStyle,inputElement);
// 			break;
// 		default:
// 			console.log('hava some error');
// 			break;
// 	}
// }

// // 利用函数将每个的input元素来进行绑定事件
// [].forEach.call(inputs,function(item,index){
// 	let thisId = item.getAttribute('id');
// 	let parentId = thisId.slice(1);
// 	let thisElement = document.getElementById(thisId);
// 	EventUnit.addEventHandle(thisElement,'focus',function(){
// 		blursFn(parentId);
// 	});
// 	EventUnit.addEventHandle(item,'blur',function() {
// 		verifyFn(parentId,thisId);
// 	});
// })

// EventUnit.addEventHandle(verifyButton,'click',function(event){
// 	[].forEach.call(inputs,function(item,index){
// 		let thisId = item.getAttribute('id');
// 		let parentId = thisId.slice(1);
// 		verifyFn(parentId,thisId);
// 	})
// })

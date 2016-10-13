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
	}
};

// 页面元素dom
var inschool = document.getElementById('inSchool');
var outSchool = document.getElementById('outSchool');
var cityInf = document.getElementById('cityInf');
var companyInput = document.getElementById('companyInput');
var companyArticle = document.getElementById('companyArticle');
var schoolArticle = document.getElementById('schoolArticle');
var university = document.getElementById('university');
// 城市和学校信息
var universityInfo = {
	"北京" : ['北京大学','清华大学','人民大学'],
	"重庆" : ['重庆大学','西南大学','重庆医科大学'],
	"四川":['四川大学','电子科技大学','四川农业大学']
};

// 返回所在城市大学的函数
function getCityUniversity (cityId){
	return universityInfo[cityId];
}
// 返回一个包含所有城市的数组
function getCityInfo(dataObj){
	let cityArry = [];
	for(let index in dataObj){
		cityArry.push(index);
	}
	return cityArry;
}
// 将数组转换成option字符串
function arryTochar(arry){
	let char = '';
	arry.forEach(function(item,index){
		char+='<option value="'+item+'">'+item+'</option>'
	});
	return char;
}
// 点击在校学生的状态
EventUnit.addEventHandle(inschool,'click',function(event){
	companyArticle.style.display = 'none';
	schoolArticle.style.display = 'block'
})
// 点击在离校学生发生的时间
EventUnit.addEventHandle(outSchool,'click',function(event){
	companyArticle.style.display = 'block';
	schoolArticle.style.display = 'none'
})
// 城市消息变换的学校同时发生转换
EventUnit.addEventHandle(cityInf,'change',function(event){
	let cityName = this.value;
	university.innerHTML= arryTochar( getCityUniversity(cityName));
});

// 页面开始将城市信息补充完毕
window.onload = function(ready){
	cityInf.innerHTML = arryTochar(getCityInfo(universityInfo));
	university.innerHTML= arryTochar( getCityUniversity(cityArryInfo[0]));
}
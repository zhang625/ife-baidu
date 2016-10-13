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

var universityInfo = {
	"beijin" : ['北京大学','清华大学'],
	"chongqing" : ['重庆大学','西南大学'],
	""
}
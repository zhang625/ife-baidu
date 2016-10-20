// 现在主要是针对小方块的编程了，这会儿会定义几个比较重要的边来变量；
// 第一：方向变量,用来记录方向。这里将会用0、1、2、3、来定义
// 上、右、下、左四个方向，该变量是a_direction;
// 第二：位置变量，这是一个对象，如下设计；
// a_position{
// 	_x:1;
// 	_y;2;
// }
// 其值均为整数，且在【0，9】该区间内；

// 然后具有如下方法：
// 1、位置方法；function a_move (){};
// 2、方向方法：function a_steering(){};
// 私有方法，变量，所以可以用私有变量这个方法来建立主要方法和对象，
// 接下来调用方法即可；
var a_object = (function (){
	var _aPosition ={
		_x:0,
		_y:0
	};
	var _aDirection = 0;
	function _aSteering (data){
		_aDirection = Math.abs(_aDirection)%4;
		switch (data) {
			case 'TUN LEF':
				_aDirection++;
				break;
			case 'TUN RIG':
				_aDirection--;
				break;
			case 'TUN BAC':
				_aDirection += 2;
				break;
			default:
				console.log('some error');
			}
	};

	function _aMove (data){
		if (_aPosition._x<=0||_aPosition._y<=0||_aPosition._x>=9||_aPosition._y>=9) {
			console.log('can`t move');
			return;
		}
		if (data == 'GO') {
			switch (_aDirection%4){
				case 0 : 
					_aPosition._x--;
					break;
				case 1 : 
					_aPosition._y++;
					break;
				case 2 : 
					_aPosition._x++;
					break;
				case 4 : 
					_aPosition._y--;
					break;
				default :
					console.log('some error');
			}
		}
	};

	function _aStatusData (){
		return {
			a_direction:_aDirection,
			a_position : _aDirection
		}
	};

	return {
		a_steering : _aSteering,
		a_move : _aMove,
		a_status_data : _aStatusData
	}
})();

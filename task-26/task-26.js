// 这个程序学习到了的东西是关于接口的暴露的情况，我可以通过指定的暴露一些接口，然后不去将太多的私有变量和方法暴露在外面，这个就是
// 涉及到了很多的封装问题
function Spaceship() {
	this._id = arguments[0] || '404';
	this._speed = arguments[1].speed || 5;
	// this._energySystem = arguments[0].energy || 3;
	this._power = arguments[1].power || 100;
	this._powerConsume = arguments[1].consume || 5;
	this._powerRestore = arguments[1].restory || 2
	this._nowState = arguments[1].commod || 'stop';
	this._position = arguments[2].position || 0;
}

来个aurguments的示例:[{}]

// 这个是飞船的动力系统，借鉴了dontry大神的代码模式
Spaceship.prototype.dynamic = function (argument) {
	var that = this;
	var fly = function () {
		that._nowState = 'fly';
		that.timer = setInterval(function () {
			if (that._position>=360) {that._position = 0};
			that._position += that._speed;
		},200);
		animateObj.fly(that._id,that._position);
	};
	var stop = function () {
		that._nowState = 'stop';
		clearInterval(that.timer);
	};
	return {
		fly: fly,
		stop: stop
	};

};

// 飞船能源系统,管理充电状态，并且调用显示函数将充电状态显示出来
Spaceship.prototype.energy = function () {
	var that = this;
	var charge = function () {
		var restory = this._powerRestore;
		var timer = setInterval(function () {
			// 飞行和摧毁状态下不能进行充电
		if (that._nowState == 'fly' || that._nowState == 'destroy' ) {
			clearInterval(timer);
			return false;
		}；
		// 能量满了不能充电
		if (that._power >= 100) {
			that._power =100;
			clearInterval(timer);
			return false; //这里返回false的原因是什么
		};
		// 充电
		that._power += charge;//我觉得这里可以精简
		animateObj.updataPower(that._id,that._power);
	},500);
	};

	var discharge = function (argument) {
		var timer = setInterval(function () {
			// 在停止和摧毁状态下面，这会儿是不会对能量进行减少的
			if (that._nowState == 'stop' || that._nowState == 'destory') {
				clearInterval(timer);
				return false;
			};
			if (that._power <= 0) {
				that._power = 0;
				clearInterval(timer);
				return false;
			};
			that._power -= that._powerConsume;
			animateObj.updataPower(that._id,that._power);
		},500)
	};
	return{
		charge:charge,
		discharge:discharge;
	};
};

// 控制飞船状态的改变
Spaceship.prototype.changeState = function (argument) {
	var that = this;
	var states = {
		fly:function () {
			that._nowState = 'fly';
			that.dynamic.fly();
			that.energy.discharge();
		},
		stop:function () {
			that._nowState = 'stop';
			that.dynamic.stop();
			that.energy.charge();
		},
		destory:function () {
			that._nowState = 'destory';
			$(that._id).css('display':'none');
			somefunction(that._id);
		}
	};
	var massageState = function(data){
		states[data];
	};
	return{
		massageState:massageState;
	}
};

// 飞船接收器，接收到信号后对飞船进行操作
Spaceship.prototype.receiveManage = function (data) {
	var that = this,
		massageData = data;
	var receiver = function () {
	  if (massageData.state != that._nowState && massageData.id = that._id) {
		that.changeState().massageState(massageData.state);
	  }
	}
	return {
		receiver : receiver;
	}
};

// 这个是动态控制系统，用来控制飞船的飞行，停止，电力状态
var animateObj = (function () {
	var updataPower;
	var fly;
})();



// 这个是指挥官系统
var commander = function(id,state){
	var mandate = {
		id : id,
		state: state
	}
};

// 传输消息系统,这个东西是船速介质，设计了私有变量，私有方法和公有方法。
var mediator = (function () {
// 这里定义了三个私有变量，用来记录传递成功的概率、创造飞船的id————这里的id我是先确定好的————、创建好了的飞船对象
	var probability = 0.3,
	    idSelectArry = ['one','two','three','four'],
	    spaceshipArry =[];
// 下面定义4个私有方法，用来控制私有数组idSelectArry、spaceshipArry
	var _getId = function () {
		var id = idSelectArry.shift() || false;
		return id;
	};
	var _addId = function (idData) {
		idSelectArry.push(idData);
	};
	var _addSapceship =function (obj) {
		spaceshipArry.push(obj);
	};
	var _destorySpaceship = function (obj) {
		let objIndex =  -1;
		spaceshipArry.each(function(item,index) {
			if (item._id = obj._id) {
				objIndex = index;
			}
		});
		if (objIndex != -1) {
			spaceshipArry.splice(objIndex,1);
			delete obj;
		} else {
			console.log('有点错误')
		}
	};
// 下面定义公有方法，用来传递信息，主要有4个，创建飞船、摧毁飞船、飞行、停止，不过我觉得这个还是私有方法样。。。
	var creat = function () {
		var id = _getId();
		if (id) {
		   var spaceship = new Spaceship(id);
		   _addSapceship(spaceship);
		   // 这里应该有个显示画面，将生成的东西显示到页面
		}
	}
})

// 这个是用来显示飞船的状态的
var ConsoleNote = (function (noteDate) {
	var consoleArea = $('console.id').
		addData = noteDate;
	var addNote = function (addData) {
		consoleArea.val(consoleArea.val()+addData);
	}
	return {
		addNote:addNote;
		}
	
})

// 我觉得应该有个飞船控制系统，用来记录飞船的数量，控制飞船的创造和
// 1、需要有一个数组来保存飞船对象，后续来广播的时候这样才可对其进行遍历，但是，判断是否应该执行是由飞船
// 自己来确定的。
// 2、我可以设计一个id数组，用来存放所有的id，每个id从里面取出来即可，那么需要有两个方法来管理这个数组，一个
// 增加，一个减少。
// 3、这个东西需要在传播介质中进行定义才行，由于传播概率的问题，只有这样才可以比较准确的把握这个东西，但是传播的命令
// 需要由指挥官来传递。
// 4、 所以指挥官可以传递一下命令，creat\destory\fly\stop\
// 这个程序学习到了的东西是关于接口的暴露的情况，我可以通过指定的暴露一些接口，然后不去将太多的私有变量和方法暴露在外面，这个就是
// 涉及到了很多的封装问题
$(document).ready(function() {
	// 通过构造函数、原型方法来创建对象
	function Spaceship() {
		this._id = arguments[0] || '404';
		this._speed = 5 || arguments[1].speed;
		// this._energySystem = arguments[0].energy || 3;
		this._power = 100 || arguments[1].power;
		this._powerConsume = 5 || arguments[1].consume;
		this._powerRestore =2 || arguments[1].restory;
		this._nowState ='stop';
		this._position =0;
	}

	// 这个是飞船的动力系统，借鉴了dontry大神的代码模式
	Spaceship.prototype.dynamic = function (argument) {
		var that = this;
		var fly = function () {
			console.log('fly');
			that.timer = setInterval(function () {
				if (that._power <= 0) {clearInterval(that.timer)};
				if (that._position>=360) {that._position = 0};
				that._position -= that._speed;		
				animateObj.fly(that._id,that._position);
			},200);
		};
		var stop = function () {
			console.log(stop);
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
			};
			// 能量满了不能充电
			if (that._power >= 100) {
				that._power =100;
				clearInterval(timer);
				return false; //这里返回false的原因是什么
			};
			// 充电
			that._power += that._powerRestore
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
			discharge:discharge
		};
	};

	// 控制飞船状态的改变
	Spaceship.prototype.changeState = function (argument) {
		var that = this;
		var states = {
			fly:function () {
				that._nowState = 'fly';
				that.dynamic().fly();
				that.energy().discharge();
			},
			stop:function () {
				that._nowState = 'stop';
				that.dynamic().stop();
				that.energy().charge();
			},
			destory:function () {
				that._nowState = 'destory';
				$('#'+that._id).css({'display':'none'});
				Mediator.destory(that);
				animateObj.destory(that._id);
			}
		};
		var massageState = function(data){
			states[data]();
		};
		return{
			massageState:massageState
		}
	};

	// 飞船接收器，接收到信号后对飞船进行操作
	Spaceship.prototype.receiveManage = function (data) {
		var that = this,
			massageData = data;
		var receiver = function () {
		  if (massageData.state != that._nowState && massageData.id == that._id) {
			that.changeState().massageState(massageData.state);
		  }
		}
		return {
			receiver : receiver
		}
	};

	// 这个是动态控制系统，用来控制飞船的飞行，停止，电力状态
	var animateObj = (function () {
		var creat = function (id) {
			let nameValue = id+':100%';
			let spaceshipCtr = '<div id=_'+id+' class="spaceShipcontrol"><p class="title">对NO:'+id+'飞船发送指令：</p><button value="fly">飞行</button><button value="stop">停止</button><button value="destory">销毁</button></div>';	
			let spaceship = '<input class="spaceShip" id="'+id+'" value='+nameValue+' readonly="readonly">';
			$("#command").append(spaceshipCtr);
			$("#spaceShipUnit").append(spaceship);
		};
		var updataPower = function (id,powerData) {
			let thatId = '#'+id;
			let inputData = id+':'+powerData+'%';
			$(thatId).val(inputData);
		};
		var fly = function (id,positions) {
			let thatId = '#'+id;
			let degValue = "rotate("+positions+"deg)";
			$(thatId).css({"transform":degValue});
		};
		var destory = function (id){
			let spaceshipId = '#'+id;
			let commandId = '#_'+id;
			$(spaceshipId).remove();
			$(commandId).remove();
		}
		return {
			creat : creat,
			updataPower : updataPower,
			fly : fly,
			destory : destory
		};
	})();

		// 传输消息系统,这个东西是船速介质，设计了私有变量，私有方法和公有方法。
	var Mediator = (function () {
		var that = this;
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
			spaceshipArry.forEach(function(item,index) {
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
		// 是不是共有方法就是只有一个send，然后通过这个send来调用这个方法
		// 这两个是私有方法，用来控制我定义的私有变量最好，那么这样我的函数是不是还能有精简的
		var privateFn = {
			creat: function () {
			var id = _getId();
			if (id) {
			   var spaceship = new Spaceship(id);
			   _addSapceship(spaceship);
			   animateObj.creat(id);
			}
			},
			destory:function (obj) {
			_addId(obj._id);
			_destorySpaceship(obj);
			}
		}

		var send = function (msgData) {
			if (Math.random() > probability) {
				var msg = '';
				switch (msgData.state) {
					case 'creat':
					  privateFn.creat();
					  break;
					case 'destory':
					case 'fly':
					case 'stop':					  
					  	spaceshipArry.forEach(function (item,index) {
					  		item.receiveManage(msgData).receiver();
					  	});					  
					  break;
					default:
					  console.log('命令无效');
					  break;
				}
			} else {
				console.log('miss')
			}
		};
		return {
			send:send,
			destory:privateFn.destory
		}

	})();


	// 这个是指挥官系统
	var commander = function(state,id){
		var mandate = {
			id : id,
			state: state
		};
		Mediator.send(mandate);
	};

	// 这个是用来显示飞船的状态的
	var ConsoleNote = (function (noteDate) {
		var consoleArea = $('console.id').
			addData = noteDate;
		var addNote = function (addData) {
			consoleArea.val(consoleArea.val()+addData);
		}
		return {
			addNote:addNote
			}
		
	})();

	// 通过按钮来控制状态，下面来监听按钮的点击状态
	$('#command').on('click','button',function(e){
		// $(this:target);
		// if ($('#command:target') =="BUTTON") {
		var commandVal = $(this).val();
		switch (commandVal){
			case 'creat' : 
			 commander(commandVal);
			 break;
			 case 'fly':
			 case 'stop':
			 case 'destory':
			   	let spaceshipId = $(this).parent().attr('id').slice(1);
			   	commander(commandVal,spaceshipId);
			   break;
			 default :
			   console.log('some error for button');
		}
	})

});

// 我觉得应该有个飞船控制系统，用来记录飞船的数量，控制飞船的创造和
// 1、需要有一个数组来保存飞船对象，后续来广播的时候这样才可对其进行遍历，但是，判断是否应该执行是由飞船
// 自己来确定的。
// 2、我可以设计一个id数组，用来存放所有的id，每个id从里面取出来即可，那么需要有两个方法来管理这个数组，一个
// 增加，一个减少。
// 3、这个东西需要在传播介质中进行定义才行，由于传播概率的问题，只有这样才可以比较准确的把握这个东西，但是传播的命令
// 需要由指挥官来传递。
// 4、 所以指挥官可以传递一下命令，creat\destory\fly\stop\
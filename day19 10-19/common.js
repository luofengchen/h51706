function setCookie(name, value, day) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + day);
	document.cookie = name + "=" + value + ";expires=" + oDate;

}

function getCookie(name) {
	var strCookie = document.cookie;
	//需要对字符串进行分割（;）
	var arrCookie = strCookie.split("; ");
	//console.log(arrCookie);
	for(var i = 0; i < arrCookie.length; i++) {
		//把数组中的每一项以=分割，判断形参和分割后的数组中的第一元素是否相等，相等则返回第二个元素
		var arr = arrCookie[i].split("=");
		if(arr[0] == name) {
			return arr[1];
		}
	}
}

function removeCookie(name) {
	setCookie(name, 1, -1);

}

function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
}

function startmove(obj, json, fn) {
//	obj.timer = null;
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var flag = true;
		for(var attr in json) {
			var icur = 0;
			//判断属性类型，获取对应的属性值。传参时需要注意opacity取值范围为1-100
			if(attr == "opacity") {
				var icur = Math.round(parseInt(getStyle(obj,attr)*100))
			} else {
				var icur = parseInt(getStyle(obj,attr));
			}
			// 计算运动速度
			var ispeed = (json[attr] - icur) / 8;
			ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
			//计算运动是否全部达到目标 为运行回调函数做准备。
			if(icur != json[attr]) {
				flag = false;
			}
			// 赋值，需要注意opacity的值是否存在 传参时需要注意opacity取值范围为1-100
			if(attr == "opacity") {
				obj.style.filter = 'alpha(opacity=' + (icur + ispeed) + ')';
				obj.style.opacity = (icur + ispeed) / 100;
			} else {
				obj.style[attr] = icur + ispeed + "px";
			}

		}
		if(flag) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}

	}, 30)
}
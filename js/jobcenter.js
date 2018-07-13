window.onload = function () {
    var dh = document.getElementById('daohang');
    var dha = dh.getElementsByTagName('a');
    var search = document.getElementById('search');
    var searchbtn = search.getElementsByTagName('button');
    var pg = document.getElementById('page');
	var pga = pg.getElementsByTagName('a');
	var chos = getClassNames('choices', 'div');

	//daohang点击效果 
	for (var i = 0; i < dha.length; i++) {
		(function(i) {
			dha[i].onclick = function () {
				for (var j = 0; j < dha.length; j++) {
					dha[j].className = "";
				}
				this.className = "checked";
			};
		})(i);
	}

    //button点击效果
    for (var i = 0; i < searchbtn.length; i++) {
		(function(i) {
			searchbtn[i].onclick = function () {
				getHref(searchbtn[i].parentNode.getAttribute("name"), searchbtn[i].getAttribute("value"));
			};
		})(i);
    }

	//筛选效果
	for (var k = 0; k < getNameValue().length; k++) {
		(function(k) {
			for (var i = 0; i < chos.length; i++) {
				(function(i) {
					if (chos[i].getAttribute('name') == getNameValue()[k][0]) {
						var chosa = chos[i].getElementsByTagName('a');
						for (var j = 0; j < chosa.length; j++) {
							chosa[j].className = '';
							(function(j) {
								if(chosa[j].getAttribute('value') == getNameValue()[k][1]) {
									chosa[j].className = 'checked';
								}
							})(j);
						}
					}	
				})(i);
			}
		})(k);
	}

	//筛选传参
	for (var i = 0; i < chos.length; i++) {
		(function(i){
			var cho = chos[i].getElementsByTagName('a');
			for (var j = 0; j < cho.length; j++) {
				(function(j){
					cho[j].onclick = function () {
						getHref(cho[j].parentNode.getAttribute("name"), cho[j].getAttribute("value"));
					};
				})(j);
			}
		})(i);
	}

	//分页效果
	for (var k = 0; k < getNameValue().length; k++) {
		(function(k) {
			if (pg.getAttribute('name') == getNameValue()[k][0]) {
				var pgaa = pg.getElementsByTagName('a');
				for (var j = 2; j < pgaa.length-2; j++) {
					pgaa[j].className = '';
					(function(j) {
						if(pgaa[j].getAttribute('value') == getNameValue()[k][1]) {
							pgaa[j].className = 'checked';
							// 当首页时上一页可点击，当尾页时下一页可点击
							if (getNameValue()[k][1] > 1) { pgaa[1].className = 'checked'; }
							if (getNameValue()[k][1] ==  pga.length - 4) { pgaa[pga.length - 2].className = ''; }
						}
					})(j);
				}
			}
		})(k);
	}

	//分页点击传参
	for (var i = 0; i < pga.length; i++) {		
		(function(i) {
			pga[i].onclick = function () {
				if (i == 0) /*点击首页*/ {
					getHref(pga[i].parentNode.parentNode.getAttribute("name"), 1);
				} else if (i == 1) /*点击上一页*/ {
					if (pageNow() == 1) /*如果当前页是 1*/{
						getHref(pga[i].parentNode.parentNode.getAttribute("name"), 1);
					} else if (pageNow() > 1 && pageNow() <= pga.length-4) /*如果当前页不是 1*/ {
						getHref(pga[i].parentNode.parentNode.getAttribute("name"), (pageNow() - 1));
					} else /*如果没有当前页也改为page=1*/ {
						getHref(pga[i].parentNode.parentNode.getAttribute("name"), 1);
					}
				} else if (i == pga.length-1) /*点击尾页*/ {
					getHref(pga[i].parentNode.parentNode.getAttribute("name"), (pga.length - 4));
				} else if (i == pga.length-2) /*点击下一页*/ {
					if (pageNow() ==  pga.length - 4) /*如果当前页是尾页*/{
						getHref(pga[i].parentNode.parentNode.getAttribute("name"), (pga.length - 4));	
					} else if (pageNow() >= 1 && pageNow() < pga.length-4) {
						getHref(pga[i].parentNode.parentNode.getAttribute("name"),  (parseInt(pageNow()) + 1));
					} else /*如果没有当前页也改为page=尾页*/ {
						getHref(pga[i].parentNode.parentNode.getAttribute("name"), 2);
					}
				} else /*点击数字*/ {
					getHref(pga[i].parentNode.parentNode.getAttribute("name"), pga[i].getAttribute("value"));
				}
			};
		})(i);	
	}

	// 改变href值
	function getHref (name, value) {
		// 为了兼容IE和FF中没有origin
			if (location.protocol) {
				return  window.location = location.protocol + location.pathname + '?' + funcUrl (name, value, 1);
			} else {
				return  window.location = location.origin + location.pathname + '?' + funcUrl (name, value, 1);
			}
		};


	// 获取当前页数
	function pageNow() {
		var loca = window.location;
		var query = loca.search.substr(1);
		var arr = query.split("&");

		for (var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].split("=");
			if(arr[i][0]=='page') {
				return arr[i][1];
			}
		};
	};

	// 获取url中search的name、value
	function getNameValue() {
		var loca = window.location;
		var query = loca.search.substr(1);
		var arr = query.split("&");

		for (var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].split("=");
		};
		return arr;
	};	

	// 为了兼容ie获取ClassName的方法
	// 通过class名和标签名获取css样式对象组
	function getClassNames (classStr, tagName) {
		if (document.getElementsByClassName) {
			return document.getElementsByClassName(classStr);
		} else {
			//为了兼容ie8及其以下版本的方法
			var nodes = document.getElementsByTagName(tageName);
			var ret = [];
			for (i = 0; i < nodes.length; i++) {
				if (hasClass(nodes[i], classStr)) {
					ret.push(nodes[i]);
				}
			}
			return ret;
		} 
	};

	// 判断TagName节点里class是否存在
	function hasClass(tagStr, classStr) {
		//这个正则表达式是因为class可以有多个,判断是否包含
		var arr = tagStr.className.split(/\s+/); //等同于split(" ")
		for (var i = 0; i < arr.length; i++) {
			if(arr[i] == classStr) {
				return true;
			}
		}
		return false;
	};


	function funcUrl(name,value,type){
		var loca = window.location;
		var baseUrl = type==undefined ? loca.origin + loca.pathname + "?" : "";
		var query = loca.search.substr(1);
		// 如果没有传参,就返回 search 值 不包含问号
		if (name==undefined) { return query }
		// 如果没有传值,就返回要查询的参数的值
		// if (value==undefined){
		// 	var val = query.match(new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"));
		// 	return val!=null ? decodeURI(val[2]) : null;
		// };
		var url;
		if (query=="") {
			// 如果没有 search 值,则返回追加了参数的 url
			url = baseUrl + name + "=" + value;
		}else{
			// 如果有 search 值,则在其中修改对应的值,并且去重,最后返回 url
			var obj = {};
			var arr = query.split("&");
			for (var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].split("=");
				obj[arr[i][0]] = arr[i][1];
			};
			obj[name] = value;
			url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
		};
		return url;
	}
};
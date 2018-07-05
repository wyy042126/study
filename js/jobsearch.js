window.onload = function () {
    var dh = document.getElementById('daohang');
    var dha = dh.getElementsByTagName('a');
    var search = document.getElementById('search');
    var searchbtn = search.getElementsByTagName('button');
    var chos = document.getElementsByClassName('choices');
    var pg = document.getElementById('page');
	var pga = pg.getElementsByTagName('a');



    //筛选
    for (var i = 0; i < chos.length; i++) {
		(function(i){
			var cho = chos[i].getElementsByTagName('a');
			for (var j = 0; j < cho.length; j++) {
				(function(j){
					cho[j].onclick = function () {
						for (var k = 0; k < cho.length; k++) {
							cho[k].className = "";
						}
						this.className = "checked";

						// 改变url中search
						location.href = location.origin + location.pathname + '?' + funcUrl (cho[j].parentNode.getAttribute("name"), cho[j].getAttribute("value"), 1);
					};
				})(j);
			}
		})(i);
	}

 


	//daohang点击效果 
	for (var i = 0; i < dha.length; i++) {
		(function(i) {
			dha[i].onclick = function () {
				for (var j = 0; j < dha.length; j++) {
					dha[j].className = "";
				}
				this.className = "checked";
				// 改变url中search
				location.href = location.origin + location.pathname + '?' + funcUrl (dha[i].parentNode.parentNode.getAttribute("name"), dha[i].getAttribute("value"), 1);
			};
		})(i);
	}
    //button点击效果
    for (var i = 0; i < searchbtn.length; i++) {
		(function(i) {
			searchbtn[i].onclick = function () {
				// 改变url中search
				location.href = location.origin + location.pathname + '?' + funcUrl (searchbtn[i].parentNode.getAttribute("name"), searchbtn[i].getAttribute("value"), 1);
			};
		})(i);
    }

    //分页
    for (var i = 0; i < pga.length; i++) {
		(function(i) {
			pga[i].onclick = function () {
				for (var j = 0; j < pga.length; j++) {
					pga[j].className = "";
				}
				this.className = "checked";
				// 改变url中search
				location.href = location.origin + location.pathname + '?' + funcUrl (pga[i].parentNode.parentNode.getAttribute("name"), pga[i].getAttribute("value"), 1);
			};
		})(i);
	}


	function funcUrl(name,value,type){
    var loca = window.location;
    var baseUrl = type==undefined ? loca.origin + loca.pathname + "?" : "";
    var query = loca.search.substr(1);
    // 如果没有传参,就返回 search 值 不包含问号
    if (name==undefined) { return query }
    // 如果没有传值,就返回要查询的参数的值
    if (value==undefined){
        var val = query.match(new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"));
        return val!=null ? decodeURI(val[2]) : null;
    };
    var url;
    if (query=="") {
        // 如果没有 search 值,则返回追加了参数的 url
        url = baseUrl + name + "=" + value;
    }else{
        // 如果没有 search 值,则在其中修改对应的值,并且去重,最后返回 url
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
/**
 * Created by Wenwu on 7/19/2016.
 * 工具类
 */
var $api = require('$api')
var ajax = require('ajax')
var axios = require('axios')
window.Promise = require('bluebird')
var Utilities = {
	getParameterByName: function (name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	findElement: function (arr, propName, propValue) {
		for (var i = 0; i < arr.length; i++)
			if (arr[i][propName] == propValue)
				return arr[i];
	},
	findWithAttr: function (array, attr, value) {
		for (var i = 0; i < array.length; i += 1) {
			if (array[i][attr] === value) {
				return i;
			}
		}
	},
	jsonObjToBase64: function (json) {
		return btoa(encodeURIComponent(JSON.stringify(json)));
	},
	base64TojsonObj: function (base64) {
		return JSON.parse(decodeURIComponent(atob(base64)));
	},
	pageJump: function (url) {
		location.href = url;
	},
	log: function () {
		console.log(JSON.parse(JSON.stringify(arguments)));
	},
	removePhotoSuffix: function (url) {
		var index, url = url || '';

		index = url.lastIndexOf('!');
		if (index > -1) {
			url = url.substring(0, index);
		}
		return url;
	},
	addPhotoSuffix: function (url, suffix) {
		var index, url = url || '', suffix = suffix || '';

		if (url) {
			url = Utilities.removePhotoSuffix(url) + suffix;
		}
		return url;
	},
	copy: function (source) {
		var result = {};
		for (var key in source) {
			result[key] = typeof source[key] === 'object' ? this.copy(source[key]) : source[key];
		}
		return result;
	},
	params: function () {
		var url = window.location.search;
		if (url.indexOf("?") != -1) {
			var str = url.substr(1),
				strs = str.split("&"),
				key = new Array(strs.length),
				value = new Array(strs.length),
				params = {};
			for (var i = 0; i < strs.length; i++) {
				key[i] = strs[i].split("=")[0]
				value[i] = unescape(strs[i].split("=")[1]);
				params[key[i]] = value[i]
			}
			return params;
		}
	},
	getItem: function (list, params) {
		var list = list || [], param, item, refer = [], ret = [];

		if (typeof params === 'object') {
			for (var key in params) {
				refer.push(params[key]);
			}
			;
			refer = refer.join('');

			for (var i = 0; i < list.length; i++) {
				item = list[i];
				ret = [];
				for (var key in params) {
					ret.push(item[key]);
				}
				;
				ret = ret.join('');
				if (ret === refer) {
					return item;
				}
			}
			return null;
		} else {
			return null;
		}
	},
	basicData: function () {
		if (sessionStorage.user) {
			//window.IGrow.school = JSON.parse(sessionStorage.school);
			window.IGrow.user = JSON.parse(sessionStorage.user);
		}
		return sessionStorage.user ? Promise.all([]) : Promise.all([
			new Promise(function (resolve) {
				ajax($api.user.get, {
					_relatedfields: 'school.*,school.student.*,roles.*,schoolinfo.*'
				}, function (result) {
					// window.IGrow.user = result['data'];
					// sessionStorage.user = JSON.stringify(window.IGrow.user);
					resolve(result);
				}, function (result) {
					resolve(result);
				});
			}),
		])
	},
	getSchoolBanner : function($this){
	    //var $this=this;
	    return new Promise(function(resolve){
	    	axios.get($api.schools.get,{params:{
		        id: $this.schoolid,
		        _relatedfields: 'profile.*'
		    }}).then(function (result) {
		    	var groupid = result.data.data.groupid;
		    	if(groupid && !$this.$route.query.schooleduid){
		    		if(sessionStorage.groupList){
		    			var groupList = JSON.parse(sessionStorage.groupList);
		    			groupList.forEach(function(each){
                            if(each.id == $this.schoolid){
                                each.active = true;
                            }
                            else{
                                each.active = false;
                            }
                            //$this.groupList.push(each);
                            //$this.groupListId.push(each.id);
                        })
                        resolve({
                        	article:result,
                        	groupList:groupList
                        })
		    		}
		    		else{
		    			axios.get($api.schoolMember.list,{params:{groupid:groupid}}).then(function(rlt){
	                        //IGrow.school.grouplist = result.data.data;
	                        var groupList = rlt.data.data;
	                        groupList.forEach(function(each){
	                            if(each.id == $this.schoolid){
	                                each.active = true;
	                            }
	                            else{
	                                each.active = false;
	                            }
	                            //$this.groupList.push(each);
	                            //$this.groupListId.push(each.id);
	                        })
	                        resolve({
	                        	article:result,
	                        	groupList:groupList
	                        })
	                        sessionStorage.groupList = JSON.stringify($this.groupList);
	                    });
		    		}
                }
                else{
                	resolve({
                    	article:result
                    })
                }

		    });
	    })

	},
	wxApiData: function (isapp, schoolid, platformid) {
		return isapp ? Promise.all([]) : Promise.all([
			new Promise(function (resolve) {
				ajax($api.wxInfo.get, {
					platformid: schoolid,
				}, function (result) {
					resolve(result.data[0]);
				})
			}),
			new Promise(function (resolve) {
				ajax($api.wxJSSDK.mediaauthget, {platformid: platformid}, function (result) {
					resolve(result);
				}, function () {
					resolve();
				})
			})
		])
	},
	getJson: function (url, successcallback, failcallback) {
		$.ajax({
			url: url,
			type: 'get',
			async: false,
			dataType: 'jsonp',
			jsonpCallback: 'JSON_CALLBACK',
			success: function (result) {
				successcallback && successcallback(result);
			},
			error: function (result, status) {
				failcallback && failcallback(result, status);
			}
		})
	},
	setColor: function (color) {
		$('.nav,.panel-body .btn,.category-publish .warp-btn .btn,.slider .slider-body h4').css('background-color', color);
		$('.class-action-title ul li.active a').css('color', color);
		$('.class-action-title ul li.active').css('border-bottom', '2px solid ' + color);
	},
	iosHack: function (title) {
		var $body = $('body');
		document.title = title
		// hack在微信等webview中无法修改document.title的情况
		if (/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/i.test(navigator.userAgent)) {
			var $iframe = $('<iframe src="/favicon.ico" style="display:none"></iframe>');
			$iframe.on('load', function () {
				setTimeout(function () {
					$iframe.off('load').remove();
				}, 0);
			}).appendTo($body);
		}
	},
	getStyle: function (typeStyle, schoolid) {
		var newTplid = typeStyle.tplid.toString() === '999' ? '999' : (parseInt(typeStyle.tplid) > 9 ? typeStyle.tplid : ('0' + typeStyle.tplid)), style;
		if (typeStyle.tplid == 1) {
			return new Promise(function (resolve) {
				Utilities.getJson('http://m-static.igrow.cn/01tpl/json/data.json', function (rlt) {
					if (typeStyle.jsonpath) {
						Utilities.getJson('http://m-static.igrow.cn' + typeStyle.jsonpath, function (result) {
							Utilities.log(result, schoolid + '-01jsonpath.json');
							style = result || [];
							resolve(style);
							Utilities.setColor(style.ThemeColor.color);
						}, function (error) {
							resolve(error);
							console.log(error, '获取数据失败！！')
						});
					}
					else {
						style = rlt;
						resolve(style);
						Utilities.log(style, 'schoolbase');
						Utilities.setColor(style.ThemeColor.color);
					}
				}, function (error) {
					resolve(error);
					console.log(error, '获取数据失败！！')
				});
			})
		}
		else {
			return new Promise(function (resolve, reject) {
				Utilities.getJson('http://m-static.igrow.cn/' + newTplid + 'tpl/json/data.json', function (rlt) {
					var tempJson = $.extend(rlt, {});
					Utilities.log(tempJson, newTplid + '-tpl.json');
					if (typeStyle.jsonpath) {
						Utilities.getJson('http://m-static.igrow.cn' + typeStyle.jsonpath, function (result) {
							var tempPreview = result || [];
							Utilities.log(tempPreview, schoolid + '-0' + typeStyle.tplid + 'jsonpath.json');
							$.each(tempJson.type, function (index, item) {
								if (tempPreview.datatype.indexOf(item) >= 0 && item.toString() == '1') {
									tempPreview.swiperPicBlock.bestSize = tempJson.swiperPicBlock.bestSize;
								}
							});
							style = $.extend(tempJson, tempPreview);
							Utilities.log(style, typeStyle.preview == 0 ? 'schoolRelease' : 'schoolPreview');
							resolve(style);
						}, function (error) {
							resolve(error);
							console.log(error, '获取数据失败！！')
						});
					}
					else {
						style = rlt;
						resolve(style);
						Utilities.log(style, 'schoolbase');
						Utilities.setColor(style.themeColor.color);
					}
				}, function (error) {
					resolve(error);
					console.log(error, '获取数据失败！！')
				});
			})
		}

	},
	geSubjectList: function (id, page, pagesize, userBind) {
		var data = {
			source: 'subject',
			categoryid: id,
			_page: page || 1,
			_pagesize: pagesize ? pagesize : 20,
			includedescription: 1,
			_orderby: 'displayorder desc,createtime desc',
			_relatedfields: "post.content",
			alllist: 1,
			publishcheck:'0,3'
		};
		!userBind && (data.ispublic = 1);
		userBind && (data.ispublic = [0, 1].join(','));
		return new Promise(function (resolve, reject) {
			axios.get($api.yzoneDatasource[userBind ? 'proxyList' : 'oproxyList'], {params: data}).then(function (result) {
				resolve(result.data);
			}).catch(function (error) {
				reject(error);
			})
		});
	},
	getListIcon: function (list) {
		list.length && list.forEach(function (item, index) {
			item.picurl && (item.url = item.picurl);
			item.url = item.picurl ? item.picurl : 'http://m.igrow.cn/assets/img/school/news/p' + (index % 21 + 1 ) + '.jpg';
			item.style = {'background-image': 'url(' + item.url + ')'};
			item.content = item.post && item.post.length != 0 && item.post.content.replace(/<[^>]+>/g, "").replace("&nbsp", "") || "";
			item.content = item.content.length > 46 ? item.content.slice(0, 46) + '...' : item.content;
		});
		return list;
	},
	getCateGory: function (typeid, schoolid, userBind, isNotice) {
		return new Promise(function (resolve, reject) {
			axios.get($api.yzoneDatasource[userBind ? 'proxyGet' : 'oproxyGet'], {
				params: {
					source: 'category',
					schoolid: schoolid,
					id: typeid,
					isauth: isNotice ? 0 : 1,
					_relatedfields: "children.*"
				}
			}).then(function (result) {
				var listDetail = result.data.data || [], iscategory, typeData;
				listDetail.children && listDetail.children || [].forEach(function (item) {
					(item.showwesite == 1) && this.push(item);
				}, listDetail.children = []);
				listDetail.children.sort(function (a, b) {
					return b.displayorder - a.displayorder;
				});
				iscategory = listDetail.children && listDetail.children.length ? true : false;
				typeData = {
					listDetail: listDetail,
					iscategory: iscategory
				}
				resolve(typeData);
			}).catch(function (error) {
				reject(error);
			})
		})
	},
	getUnread: function (unids, schoolid, isNotice) {
		return new Promise(function (resolve, reject) {
			ajax($api.yzoneCategory.unread, {
				schoolid: schoolid,
				level: 1,
				isauth: isNotice ? 0 : 1,
				categoryid: unids.join(',')
			},function (result) {
				var unreadData = result.data || [];
				resolve(unreadData);
			},function (error) {
				reject(error);
			})
		})
	},
	/*tip: function (msg, time) {
	 var html = '<div class="weui_dialog_alert" id="tip">' +
	 '<div class="weui_mask"></div>' +
	 '<div class="weui_dialog">' +
	 '<div class="weui_dialog_hd"><strong class="weui_dialog_title">提示</strong></div>' +
	 '<div class="weui_dialog_bd">' + msg + '</div>' +
	 '<div class="weui_dialog_ft">', time = time || 2000;
	 if ($('#tip').length) {
	 $('#tip .weui_dialog_bd').html(msg);
	 $('#tip').show();
	 } else {
	 $('body').append(html)
	 $('#tip').show();
	 }
	 ;
	 $('#tip').click(function () {
	 $(this).hide();
	 })
	 setTimeout(function () {
	 $('#tip').hide();
	 }, time);
	 },*/
	tips: function (msg, time) {
		var html = '<div id="tips" class="tipModel">' +
			'<i></i>' +
			'<span></span>' +
			'<</div> ', time = time || 2000;

		if ($('#tips').length) {
			$('#tips span').html(msg);
			$('#tips').fadeIn('fast');
		} else {
			$('body').append(html);
			$('#tips span').html(msg);
			$('#tips').fadeIn('fast');
		}
		;
		$('#tips').click(function () {
			$(this).fadeOut();
		})
		setTimeout(function () {
			$('#tips').fadeOut();
		}, time);
	},
	loadScript: function (loadList) {
		var promiseList = [];
		loadList.forEach(function (item) {
			promiseList.push([
				new Promise(function (resolve, reject) {
					(function toload(index, url, element) {
						element = document.createElement('script');
						element[document.addEventListener ? 'onload' : 'onreadystatechange'] = function (_, isAbort) {
							document.body.removeChild(element);
							resolve(item.url);
							console.log(item);
						};
						element.onerror = function () {
							reject();
						};
						element.src = item.url;
						document.body.appendChild(element);
					}(0));
				})
			])
		})
		return Promise.all(promiseList);
	},
	getCookie: function (cookie_name) {
		var allcookies = document.cookie;
		var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度

		// 如果找到了索引，就代表cookie存在，
		// 反之，就说明不存在。
		if (cookie_pos != -1) {
			// 把cookie_pos放在值的开始，只要给值加1即可。
			cookie_pos += cookie_name.length + 1;      //这里容易出问题，所以请大家参考的时候自己好好研究一下
			var cookie_end = allcookies.indexOf(";", cookie_pos);

			if (cookie_end == -1) {
				cookie_end = allcookies.length;
			}

			var value = unescape(allcookies.substring(cookie_pos, cookie_end));         //这里就可以得到你想要的cookie的值了。。。
		}
		return value;
	},
	/*************************************/
	extend: function () {
		var _extend,
			_isObject,
			arr = arguments,
			result = {},
			i;

		_isObject = function (o) {
			return Object.prototype.toString.call(o) === '[object Object]';
		};

		_extend = function self(destination, source) {
			var property;
			for (property in destination) {
				if (destination.hasOwnProperty(property)) {

					// 若destination[property]和sourc[property]都是对象，则递归
					if (_isObject(destination[property]) && _isObject(source[property])) {
						self(destination[property], source[property]);
					}
					;

					// 若sourc[property]已存在，则跳过
					if (source.hasOwnProperty(property)) {
						continue;
					} else {
						source[property] = destination[property];
					}
				}
			}
		};

		if (!arr.length) return {};

		for (i = arr.length - 1; i >= 0; i--) {
			if (_isObject(arr[i])) {
				_extend(arr[i], result);
			}
		}

		arr[0] = result;

		return result;
	},
	isObject: function (x) {
		return (typeof x === "function" || (typeof x === "object" && x !== null));
	},

	date: function (value, form) {
		var $this = new Date(parseInt(value));
		var o = {
			"M+": $this.getMonth() + 1, //month
			"d+": $this.getDate(), //day
			"h+": $this.getHours(), //hour
			"m+": $this.getMinutes(), //minute
			"s+": $this.getSeconds(), //second
			"q+": Math.floor(($this.getMonth() + 3) / 3), //quarter
			"S": $this.getMilliseconds() //millisecond
		}

		if (/(y+)/.test(form)) {
			form = form.replace(RegExp.$1, ($this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}

		for (var k in o) {
			if (new RegExp("(" + k + ")").test(form)) {
				form = form.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return form;
	}
}
Utilities.routeParams = Utilities.params();
export default Utilities

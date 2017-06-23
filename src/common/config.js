if (location.origin == 'http://grade.igrow.cn') {
	var host = 'http://m.igrow.cn/1.1b/', server_host = 'http://m.igrow.cn/api/1.1b/', oserver_host = 'http://m.igrow.cn/oapi/1.1b/', local_host = 'http://m.igrow.cn/api/';
} else {
	var host = location.origin + '/1.1b/', server_host = location.origin + '/api/1.1b/', oserver_host = location.origin + '/oapi/1.1b/', local_host = location.origin + '/api/';
}
module.exports = {
	server_host: server_host,
	/************学校班级用户接口*************/
	classStudent: {
		'list': server_host + 'school/class/student/list',
	},
	schoolClass: {
		list: server_host + 'school/class/list',
		'get': server_host + 'school/class/get'
	},
	school: {
		'get': server_host + 'school/get'
	},
	schools: {
		'get': oserver_host + 'school/get'
	},
	schoolMember:{
		'list':oserver_host + 'school/group/member/list'
	},
	user: {
		'get': server_host + 'user/get'
	},
	role: {
		'check': server_host + 'auth/user/role/check',
		'list': server_host + 'auth/user/role/list'
	},
	auth: {
		'check': server_host + 'auth/merged/user/authitem/check'
	},
	/***********微信相关接口*************/
	wxJSSDK: {
		'mediaauthget': local_host + 'mediaauthget',
		'sdkencrypt': local_host + 'sdkencrypt',
	},
	wxInfo: {
		'get': server_host + 'yo/wx/userinfo/get',
		'list': server_host + 'yo/wx/userinfo/list'
	},
	platform: {
		'get': server_host + 'yo/wx/platform/get'
	},
	app: {
		'list': server_host + 'auth/user/app/list'
	},
	wx: {
		'templatepush': server_host + 'business/wx/templatepush'
	},
	sms: {
		add: server_host + 'sms/add',
		send: server_host + 'sms/send',
	},
	message: {
		'push': host + 'wx/message/push'
	},

	/************网站文章接口*************/
	yzoneModuleSchtpls: {
		'proxyGet': local_host + 'proxy/yzone/moduleschtpls/get'
	},
	yzoneSite: {
		'get': server_host + 'yzone/site/get'
	},
	mediaUpload: {
		'get': server_host + 'file/upload/media/get'
	},
	yzoneCategory: {
		'unread': server_host + 'yzone/category/unread'
	},
	yzoneDatasource: {
		'proxyList': server_host + 'yzone/datasource/list',
		'oproxyList': local_host + 'proxy/yzone/datasource/list',
		'proxyGet': server_host + 'yzone/datasource/get',
		'oproxyGet': local_host + 'proxy/yzone/datasource/get'
	},
	/************点赞评论接口*************/
	subjectvisit: {
		'create': oserver_host + 'yzone/subjectvisit/create'
	},
	subjectlike: {
		'get': oserver_host + 'yzone/subjectlike/get',
		'create': oserver_host + 'yzone/subjectlike/create',
		'delete': oserver_host + 'yzone/subjectlike/delete'
	},
	subjectreply: {
		'create': oserver_host + 'yzone/subjectreply/create',
		'list': oserver_host + 'yzone/subjectreply/list',
		'delete': oserver_host + 'yzone/subjectreply/delete',
	},
	subjectcomment: {
		'list': oserver_host + 'yzone/subjectcomment/list',
		'delete': oserver_host + 'yzone/subjectcomment/delete',
		'create': oserver_host + 'yzone/subjectcomment/create',
	},
	yzoneSubject: {
		'create': server_host + 'yzone/subject/create',
		'delete': oserver_host + 'yzone/subject/delete',
		'unread': server_host + 'yzone/subject/unread'
	},
	moduleCheck: {
		'list': server_host + 'business/module/publish/checker/list'
	},
	schoolcheckmodule:{
		'list': server_host + 'business/module/publish/schoolcheckmodule/list'
	}
}

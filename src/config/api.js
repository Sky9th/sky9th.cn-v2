export var apiList = {
    "development": {
        'register': {
            url: 'user/register',
            method: 'post'
        },
        'login': {
            url: 'user/login',
            method: 'post'
        },
        'userInfo': {
            url: 'user/info',
            method: 'get'
        },
        'verify': {
            url: 'user/getVerify',
            method: 'post'
        },
        'captcha': {
            url: 'user/captcha',
            method: 'post'
        },
        'chat/index': {
            url: 'chat/index',
            method: 'get'
        },
        'chat/submit': {
            url: 'chat/msg',
            method: 'post'
        }
    }
    ,
    "production": {
        'index': {
            url: 'index',
            method: 'post'
        }
    }
}
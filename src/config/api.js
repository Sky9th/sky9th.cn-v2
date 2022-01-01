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
        'setNickname': {
            url: 'user/setNickname',
            method: 'post'
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
        },
        'chat/people': {
            url: 'chat/people',
            method: 'get'
        },
        'chat/tag': {
            url: 'chat/tag',
            method: 'get'
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
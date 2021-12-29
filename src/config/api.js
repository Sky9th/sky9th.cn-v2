export var apiList = {
    "development": {
        'index': {
            url: 'sky9th/index',
            method: 'get'
        },
        'register': {
            url: 'user/register',
            method: 'post'
        },
        'login': {
            url: 'user/login',
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
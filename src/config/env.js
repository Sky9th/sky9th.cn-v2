const env = {
    'development' : {
        host: process.env.REACT_APP_HTTP_HOST,
        baseURL: process.env.REACT_APP_BASE_URL,
        key: process.env.REACT_APP_KEY,
    },
    'production': {
        host: process.env.REACT_APP_HTTP_HOST,
        baseURL: process.env.REACT_APP_BASE_URL,
        key: process.env.REACT_APP_KEY,
    }
}

export default env;
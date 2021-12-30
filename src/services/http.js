import axios from "axios";
import { apiList } from '../config/api'
import env from '../config/env'
import util from '../util/util'
import store from "./store/store";

export var apiConfig = {
    // `url` is the server URL that will be used for the request
    url: '',

    // `method` is the request method to be used when making the request
    method: '', // default

    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: '',

    // `headers` are custom headers to be sent
    headers: {'X-Requested-With': 'XMLHttpRequest'},

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    params: {},

    data: {},

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 15000, // default is `0` (no timeout)

    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: false, // default
    // `responseType` indicates the type of data that the server will respond with
    // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
    //   browser only: 'blob'
    responseType: 'json', // default

    // `responseEncoding` indicates encoding to use for decoding responses (Node.js only)
    // Note: Ignored for `responseType` of 'stream' or client-side requests
    responseEncoding: 'utf8', // default

    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    xsrfCookieName: 'XSRF-TOKEN', // default

    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: 'X-XSRF-TOKEN', // default

    // `maxContentLength` defines the max size of the http response content in bytes allowed in node.js
    maxContentLength: 2000,

    // `maxBodyLength` (Node only option) defines the max size of the http request content in bytes allowed
    maxBodyLength: 2000,

    // `maxRedirects` defines the maximum number of redirects to follow in node.js.
    // If set to 0, no redirects will be followed.
    maxRedirects: 5, // default
};

const http = {
    name: "api",
    loading: false,

    $ (endpoint, data, param) {
        console.log('--------api endpoint:' + endpoint + '-----------')
        if( !apiList[process.env.NODE_ENV]) { console.log('----------no env api list------------');return false; }
        let api = apiList[process.env.NODE_ENV][endpoint]
        if (!api) { console.log('--------no endpoint---------');return false; }

        let url = api.url;
        let pattern  = new RegExp(/{(.*?)}/g);
        let match = url.match(pattern)
        let replace = param;
        if (api.method === 'get') {
            replace = Object.assign({}, data, param)
        }
        if (match && match.length > 0) {
            match.forEach((val) => {
                let p = val.match(/{(.*?)}/)
                url = url.replace(val, replace[p[1]] ? replace[p[1]] : '')
            })
        }

        return this.request(api.method, url, data, param)
    },

    request (method, url, data, param) {
        let that = this
        let config = {
            url,
            method,
            params: param ? param : (method === 'get' ? data : {}),
            data: method !== 'get' ? data : {}
        };
        let instance = axios.create(Object.assign(apiConfig, env[process.env.NODE_ENV]));

        instance.interceptors.request.use(function (config) {
            console.log('--------start endpoint----------');
            config.headers['X-Requested-With'] = 'XMLHttpRequest'
            let param = util.encrypt.getSignatureParam()
            config.headers = Object.assign(config.headers, param)
            that.showLoading();
            return config;
        }, function (error) {
            // Do something with request error
            console.log('--------stop endpoint----------');
            that.hideLoading();
            return Promise.reject(error);
        });

        instance.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            console.log('--------done endpoint----------');
            that.hideLoading();
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            console.log('--------error endpoint----------');
            let data = error.response.data;
            store.dispatch({type:'notice/noticePush', payload: {title:'错误', msg: data.msg}})
            that.hideLoading();
            return Promise.reject(error);
        });

        return instance.request(config)
    },

    get (url, data, param) {
        return this.request('get', url, data, param)
    },

    post (url, data, param) {
        return this.request('post', url, data, param)
    },

    put (url, data, param) {
        return this.request('put', url, data, param)
    },

    delete (url, data, param) {
        return this.request('delete', url, data, param)
    },

    showLoading () {
        document.getElementById('loading').style.display = 'flex'
    },
    hideLoading () {
        document.getElementById('loading').style.display = 'none'
    }
}

export default http;
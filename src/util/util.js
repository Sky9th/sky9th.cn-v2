import encrypt from './encrypt';
import cookies from "./cookies";
import form from "./form";
import modal from "./modal";

const util = {
    cookies,
    encrypt,
    form,
    modal
}

/**
 * @description 更新标题
 * @param {String} titleText 标题
 */
util.title = function (titleText) {
    const processTitle = 'Sky9th'
    window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
    let a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    a.setAttribute('id', 'd2admin-link-temp')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

util.setForm = function (e, setState) {
    const name = e.target.name;
    if(!name) { console.log('---- no name------');return false; }
    const value = e.target.value;
    setState(values => ({...values, [name]: value}))
}

export default util
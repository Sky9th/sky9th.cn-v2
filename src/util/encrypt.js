import JSEncrypt from 'jsencrypt'
import util from './util'
import env from "../config/env";

const encrypt = {}

/**
 * 生成签名
 * @param nonceStr
 * @param timestamp
 * @returns {PromiseLike<ArrayBuffer>}
 */
encrypt.makeSignature = function (nonceStr, timestamp) {
    let crypt = new JSEncrypt()
    crypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCAUlVSmPZnhNFJgBzWIzfTt4bJ\n' +
        'y1EZC7JLumn/1raTNTHwbC3vUzT6JRUbXJ8rTtfFI3ul/848HJPQlCbp37EcawrE\n' +
        'lbr0G3IibEf7R21s8Yz65B6Z1ERrd/ZZzQIvVoo95YJMuk8oKJrVylcYin7RiXRM\n' +
        'UOxcgVUarN4Pn1DByQIDAQAB')
    const param = {
        timestamp: timestamp,
        nonceStr: nonceStr,
        key: env.key || ''
    }
    let str = JSON.stringify(param)
    return crypt.encrypt(str)
}

encrypt.getSignatureParam = () => {
    const nonceStr = randomStr(8)
    const timestamp = Date.parse(new Date()) / 1000
    const signature = encrypt.makeSignature(nonceStr, timestamp)
    return {
        Signature: signature,
        Timestamp: timestamp,
        NonceStr: nonceStr,
        'Session-Key': util.cookies.get('sessionKey')
    }
}

/**
 * 返回随机字符串
 * param length 字符串长度
 */
function randomStr (length) {
    const x = '0123456789qwertyuioplkjhgfdsazxcvbnm'
    let tmp = ''
    for (let i = 0; i < length; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
    }
    return tmp
}

export default encrypt

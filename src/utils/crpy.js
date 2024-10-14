import { MD5, SHA1 } from 'crypto-js'

function md5Func (content) {
  const md5Hash = MD5(content)
  return md5Hash.toString()
}

function sha1Func (content) {
  const sha1Hash = SHA1(content)
  return sha1Hash.toString()
}

function encryptPassword (param) {
  const calPassword = md5Func(param).slice(0, -2)
  return sha1Func(calPassword)
}

export default encryptPassword

import request from '@/common/request.js'

export const Login = ({ username, pwd }) => {
  return request.post(`/setting/auth/login?username=` + username + `&password=` + pwd)
}

console.log(request)
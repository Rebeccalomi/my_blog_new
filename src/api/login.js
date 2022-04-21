import request from '@/request'

export function login(account, password) {
  const data = {
    account,
    password
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout(token) {
  return request({
    headers: {'Authorization': token},
    url: '/logout',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    headers: {'Authorization': token},
    url: '/users/currentUser',
    method: 'get'
  })
}

export function register(account, nickname,password,avatar) {
  const data={
    account,
    nickname,
    password,
    avatar
  }
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function update(account, nickname,password,passwordnew,avatar) {
  const data={
    account,
    nickname,
    password,
    passwordnew,
    avatar
  }
  return request({
    url: '/login/update',
    method: 'post',
    data
  })
}
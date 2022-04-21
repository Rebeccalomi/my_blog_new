/*
 * @Author: your name
 * @Date: 2022-04-16 00:39:04
 * @LastEditTime: 2022-04-17 02:47:03
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my_blog_new/src/api/msgfriend.js
 */
import request from '@/request'

export function getAllMessage() {
    return request({
        url: '/msg/getmsg',
        method: 'get',
    })
}

export function sendMessage(message) {
    return request({
        url: '/msg/publish',
        method: 'post',
        data: message
    })
}

export function getAllFriend() {
    return request({
        url: '/friend/get',
        method: 'post',
    })
}

export function getOption() {
    return request({
        url: '/option/getOption',
        method: 'post',
    })
}
import request from '@/request'

export function upload(formdata) {
    return request({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: '/upload',
        method: 'post',
        data: formdata
    })
}
export function uploadimage(formdata) {
    return request({
        url: '/upload/update',
        method: 'post',
        data: formdata
    })
}
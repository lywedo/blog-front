/*判断环境使用不同接口*/
// export let baseurl = process.env.NODE_ENV === 'production' ? 'https://api.brianlee.cn' : 'http://localhost:3000';
export let baseurl = process.env.NODE_ENV === 'production' ? 'https://api.brianlee.cn/' : 'http://172.16.4.51:10880/'
export let dockerurl = 'http://my.blog:8080/'
export let USER_INFO = "USER_INFO"

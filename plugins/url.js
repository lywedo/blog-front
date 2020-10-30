/*判断环境使用不同接口*/
// export let baseurl = process.env.NODE_ENV === 'production' ? 'https://api.brianlee.cn' : 'http://localhost:3000';
export let baseurl = process.env.NODE_ENV === 'production' ? 'https://api.brianlee.cn/' : 'http://58.87.109.42:10880/'
export let dockerurl = 'http://58.87.109.42:10880'
export let USER_INFO = "USER_INFO"

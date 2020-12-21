import Vue from 'vue'

var vm = new Vue({})

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    if (process.browser) {
      vm.$loading()
      let token = sessionStorage.getItem('USER_INFO')==null ?null:JSON.parse(sessionStorage.getItem('USER_INFO')).authorization
      // let token = $store.userInfo.authorization
      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;
    }
  })

  $axios.onResponse(response => {
    if (process.browser) {
      let load = vm.$loading();
      load.close();
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })

}
// $axios.interceptors.request.use(function (config) {
//   let token = localStorage.getItem('authorization');
//   if (token) {
//     config.headers['Authorization'] = token;
//   }
//   return config;
// })

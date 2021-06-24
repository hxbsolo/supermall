import axios from 'axios' //引入axios

//封装网络请求
export function request(config){
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //进行请求拦截
  instance.interceptors.request.use(config =>{
    return config   //此时拦截到的为请求配置
  },err =>{
    console.error(err)
  })

  //进行响应拦截
  instance.interceptors.response.use(res =>{
    return res  //此时拦截到的为数据
  },err =>{
    console.error(err)
  })

  //返回Promise对象
  return instance(config)
}

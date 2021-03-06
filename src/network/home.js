import {request} from "./request";
//封装关于首页的所有请求

//轮播图
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

//首页商品
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
//函数调用 ->压入函数栈(保存函数调用过程中所有变量)
//函数调用结束 ->弹出函数栈(释放函数所有变量)

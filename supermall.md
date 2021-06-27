# Git

1. git clone 加上你gith项目的地址  
2. 找到supermall1 赋值到 你所cpy的supermall  .git和包文件不需要copy
3. 这个时候supermall复制粘贴过来的为红色,是因为没有在该仓库代码管理之下
4. 通过git add . 添加  git commit -m ‘初始化项目’ 这个时候就提交到本地了
5. 再通过git push 提交到远程的githu仓库
6. git push 运行时,第一次弹出来登录框 写你的github账号密码 第二次填用户名  密码  
7. 然后会让你在终端再次输入一次用户名和密码之后回车
8. 成功就会在你的gith 仓库中看见你所提交的代码



```js
git remote add origin +你github仓库的地址
git push -u origin main 提交进去

git add .
git status 
git commit -m '提交修改信息'
git push origin main  //main 分支
```



# Project



### 初始化

##### 划分目录结构

assets  资源   一般里面放入img文件夹 和css文件夹

components  组件  一般放入公共的组件

  其中分为两类 common   content

common   完全公共的组件 不仅在本项目中可以使用,在别的项目中我也可以使用

content   与当前项目业务相关的公共组件

views 文件夹   这里面放入一些大的视图,比如首页，购物车,详情页等等,可以在里面再创文件夹细分

router 路由相关

store  Vuex状态管理相关

netword  网络封装相关

common  文件夹 放入一些公共的js文件,其中

  const.js 放置一些公共的常量,

  utils.js  公共的方法

  mixin.js  混入相关

![image-20210623091703707](C:\Users\huxuexia\AppData\Roaming\Typora\typora-user-images\image-20210623091703707.png)

##### Css文件的引用

对于项目的css 做一个基本的样式和初始化统一

 刚创建项目时,在assets/css下创建noramilze.css/base.css 来对css样式进行一个统一

 noramilze.css 是在github中下载的css文件   是用来统一css样式的

base.css  是你自己写的一些css 来进行统一

```css
:root{  /* :root 获取根元素*/
    --font-size:14px;   /*css 中定义变量 可以通过var(--font-size) 进行使用*/
}
body{
    font-size:var(--font-size);
}
/*也可以通过less sass 进行编译*/
```

##### 设置别名

vuecli3 新增 vue.config.js ,用户可以自己创造一个vue.config.js文件

然后在该文件中写入你需要的配置

##### configureWebpack 和  editorconfig

其中有个属性  configureWebpack :

如果这个值是一个对象，则会通过 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并到最终的配置中。

如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。

.editorconfig 文件 用来规范团队中成员代码的样式和风格



### 正式开始

##### 引入tabar,模块划分

引入公共的tabbar ->路由映射关系

 

##    首页 

##### 导航组件的封装 

 ![image-20210623201143584](C:\Users\huxuexia\AppData\Roaming\Typora\typora-user-images\image-20210623201143584.png)

根据需求简单分为三块 使用具名插槽来进行分组   并引入到home组件中注册添加

flex布局  如果当你 左右两边都有具体的宽度,那么给中间设置flex:1; 就会占下剩余所有位置  可灵活运用



##### 网络请求的封装

network 中创建config.js 封装一个axios网络请求

​       network 中创建home.js文件 里面添加关于Home中的所有网络请求

​       通过

```js
创建home.js来降低Home对于axios的耦合,利于管理home的网络请求,以及逻辑会更清晰

Home只需要拿到数据来进行操作,而不需要去管网络请求
```



##### 轮播图![image-20210624091317690](C:\Users\huxuexia\AppData\Roaming\Typora\typora-user-images\image-20210624091317690.png)

引入已经封装完的轮播图组件

![image-20210624090811213](C:\Users\huxuexia\AppData\Roaming\Typora\typora-user-images\image-20210624090811213.png)

在home组件内新增childComps 目录 代表home页面下的子组件

 添加HomeSwiper 其中 引入已经封装完的轮播图组件,通过props 从 home 获取到数据banners进行渲染 图片等等,并且在home 注册使用



#####  推荐信息![image-20210624091343760](C:\Users\huxuexia\AppData\Roaming\Typora\typora-user-images\image-20210624091343760.png)

在Home下创建子组件 Home_Recommends来进行推荐信息的 编写

通过props 从home组件获取到渲染所需的数据

##### TabControl  

在content 创建 tabcontrol 文件夹创建 TabControl创建组件,由于只是文字不同,所以没有采用插槽,而是通过父子传参props来进行

##### 首页商品列表

![image-20210624160251383](C:\Users\huxuexia\AppData\Roaming\Typora\typora-user-images\image-20210624160251383.png)

##### 保存商品的数据结构设计

分别有三种不同的数据需要我们进行请求,渲染

可以在data中定义一个对象goods,里面有三个对象分别对应着三种不同的数据,在这三个对象中在定义page,list属性的初始值.用来存储三种数据

![image-20210624160709513](C:\Users\huxuexia\AppData\Roaming\Typora\typora-user-images\image-20210624160709513.png)

设置page  是因为 一般当我们请求数据时,不会请求太多,不然dom加载过多,会导致页面加载变慢卡顿,甚至崩溃. 

一般会跟后端商量,比如说我请求一次给我们30条数据,或者你请求到数据了,但不要着急进行刷新,而是定时刷新出去.

那在这里 给的接口是每次请求会给你30条数据,并且返回一个page属性,代表你所请求的是那一页的数据,我们可以通过page来观察当前所请求到,以及你刷新获取的是那一页的数据   ,会出现 比如 流行 我刷新到第5页   新款 我刷新到第1页   精选我刷新到第3页等等这种情况

至于list 是我们存放每次获取的数据,这里是每获取30条数据就push 到相应的list中,并且通过vue响应式数据,实时更新

此项目API:

http://152.136.185.210:7878/api/m5

在network/home.js中封装对于商品数据的请求   

```js
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}

type(sell/pop/new三个其中之一)和page(page从1开始)参数没有传, 是必传参数.
格式: /home/data?type=sell&page=1

然后引入home进行调用
在钩子函数crted中进行网络请求,
这里我们是不希望在created中进行数据处理的,而是通过在methods中封装请求,
在methods中 进行数据处理.

所封装在方法中的请求函数
//请求相应商品数据
//  type 为所传参数 参考上面此API传参
    getHomeGoods(type){
//此API每请求一次会返回30条数据,并且返回page,代表返回数据所代表的页数
// page:1 代表第一页的数据
//并且每请求一次,获取下一页的数据
      const page = this.goods[type].page++
       //then 方法 来处理 返回的数据
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.data.list)
        //获取TabControl所需title
        this.titles = [...res.data.data.filter.list]
      })
    }
```

然后在根据展示列表进行组件封装,样式调整

##### TabControl点击切换商品

通过子传父 在你点击的时候,发送一个为tabClick的事件,参数为你当前点击商品类别的下标,并在Home进行监听,使其监听到触发tabClick（tabClick分别为两个不同函数,命名重复而已）,

```js
//home组件中
methods:{
  tabClick(index){
    //利用switch 来分辨
      switch(index){
          case 0:
            this.currentType = 'pop'
              break
          case 0:
            this.currentType = 'new'
              break    
          case 0:
            this.currentType = 'sell'
              break
      }
  }
}
computed:{
    showGoods(){
        //并且通过计算属性来尽心父 传子  //子组件在拿到数据后就可以开始进行循环渲染
        return this.goods[this.currentType].list
    }
}
```

```js
//home中所定义的data
  data(){
    return {
      // result:null,
      banners:[],
      recommends:[],
      titles:[],
      goods:{
        'pop': { page:0,list:[]},
        'new': { page:0,list:[]},
        'sell': { page:0,list:[]},
      },
      //定义一个为currentType来控制我们请求相应的商品数据
      //默认请求一次pop数据
      currentType: 'pop'
    }
  },
```

#### Better-scroll 

BetterScroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件。它的核心是借鉴的 [iscroll](https://github.com/cubiq/iscroll) 的实现，它的 API 设计基本兼容 iscroll，在 iscroll 的基础上又扩展了一些 feature 以及做了一些性能优化。

BetterScroll 是使用纯 JavaScript 实现的，这意味着它是无依赖的。

##### 安装

```js
npm install better-scroll -Save  // 安装带有所有插件的 BetterScroll

npm install @better-scroll/core // 核心滚动，大部分情况可能只需要一个简单的滚动
```

相应组件下引入  Betterscroll


```js
import Bscroll from 'better-scroll'

mounted(){
    //这里面第一个参数需要传入一个DOM节点,这个节点是作为一个容器 
    // wrapper 可自定义class/id等等,就可以完成滚动效果了
  let bs = new Bscroll(document.querySelector('.wrapper'),{

  
  })
}
```

##### 初始化但无法滚动?



浏览器的滚动条大家都会遇到，当页面内容的高度超过视口高度的时候，会出现纵向滚动条；当页面内容的宽度超过视口宽度的时候，会出现横向滚动条。也就是当我们的视口展示不下内容的时候，会通过滚动条的方式让用户滚动屏幕看到剩余的内容。BetterScroll也是这样一个原理

![image-20210625154315571](C:\Users\huxuexia\AppData\Roaming\Typora\typora-user-images\image-20210625154315571.png)

在BetterScrol 源码中

1x 中 具体使用的是BScroll 这样一个函数 来进行滚动操作

```js
<script src='better-scroll.js'></script>
<script>
    // wrapper  是你传入的DOM节点
    let roll =new BScroll('.wrapper',{
       
    })
</script>
```

但是 1x 已经不维护了

2x 中是 BetterScroll 中的 createBScroll

```js
<script src='better-scroll.js'></script>
<script>
    // wrapper  是你传入的DOM节点
    //利用createBSroll
    let roll = BetterScroll.createBSroll('.wrapper',{
        
    })
</script>
```

##### probType  属性

可选参数(0|1|2|3)  type: number

```js
1x中
1x 不再维护
```

```js
2x中
probType 为 0 任何时候都不会派发scroll事件
probType 为 1 仅仅当手指按住滑动,每隔momentumLimitTime 毫秒,才会 派发scroll事件
probType 为 2 仅仅当手指按住滑动,派发scroll事件
probType 为 3 任何时候都派发scrool事件,包括调用scrool事件/触发momentum滚动动画
```

##### 插件pullup/pulldown

扩展上拉/下拉加载的能力

```js
npm install @better-scroll/pullup --save 
npm install @better-scroll/pull-down --save 
 or 
yarn add @better-scroll/pull-up
yarn add @better-scroll/pull-down
//然后注册此插件
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'
  import PullDown from '@better-scroll/pull-down'
  BScroll.use(Pullup)
  BScroll.use(PullDown)
  
//实例化BetterScroll时,传入
pullup的配置官方文档:
https:https://better-scroll.github.io/docs/zh-CN/plugins/pullup.html#pullupload-%E9%80%89%E9%A1%B9%E5%AF%B9%E8%B1%A1
pulldown配置官方文档:
https://better-scroll.github.io/docs/zh-CN/plugins/pulldown.html#%E4%BB%8B%E7%BB%8D

threshold  type number 
new BetterScroll('.wrapper',{
    pullUpLoad :{  
         threshold: 100,//  配置底部下拉的距离大于此 就触发pullingUp
    },
    pullDownRefresh:{
        threshold: 100,//  配置顶部下拉的距离小于此 就触发pullingDown
        stop:40, //悬停的距离
    }
})
```

  当你的 pullupLoad 为true的时候,并且触发上拉到距离小于  threshold

  会发送一个 为 pullingUp的事件,你可以通过创造的实例BetterScroll的on方    法来监听此事件,

  当你这样做的时候,你会发现等你第一次触发上拉到底部,回调函数执行了,

  而你第二次试着触发上拉到底部,发现回调函数并没有执行

  是因为  BetterScroll 认为你的上拉加载行为并没有结束, 你需要通过

  finishPullIUp() 告诉 BetterScroll  结束本次上拉加载行为

 当  pullDownRefresh  为true,并且下拉距离大于你所设置的threshol的时候触发`pullingDown`等同于pullingUp

  需要通过finishPullDuwn告诉 BetterScroll 结束本次下拉加载行为



##### BetterScroll在项目中的封装和使用

1. 基本使用
2. 解决容器 动态高度

```js
//引入BetterScroll
import BetterSCroll from 'better-scroll'
//由于1x 版本不再维护 
//2x中我们需要安装一个插件来进行observe-dom 来进行动态获取scrollheight 可滚动高度,使得规定容器 动态高度中滚动
npm install @better-scroll/observe-dom --save
import ObserveDOM from '@better-scroll/observe-dom'
//在mouted阶段使用
mounted(){
    let srcoll = new BetterScroll('.wrapper',{
       pullUpLoad:true,  // 2x 必须写入该参数,否则不支持上拉
       pullDownRefresh:true //true 支持下拉
        ObserveDOM:true //动态获取可滚动高度
    })
}
```

设置wrapper 的高度 ,这里你的高度应该是你的视口高度减去导航和最底部的tabbar

可以通过calc函数来获取

```css
.wrapper{
    /*这里的100%继承与home的高度,所以home高度应设置为100vh*/
    height:calc(100% - 93px);  /*这里的93 = 导航高度+tabbar高度*/
}
```

3. 上拉出现空白

通过  

```
this.srcoll.finishPullUp()
this.srcoll.finishPullDown()
结束所相应的上拉/下拉加载行为
```

##### 回到顶部

components/content/BackTop/BackTop.vue

通过监听backtop组件的点击 来进行返回顶部

但是一般是无法监听组件点击的,我们需要通过

```js
@click.native 
通过v-on修饰符 native 可以监听组件原生事件,不仅仅是点击

然后通过ref标记scroll组件
通过this.$refs.scroll.scroll获取创建的BetterScroll对象scroll
调用scroll.scrollTo(a,b,c,d,e) 来达到返回顶部的效果
a: {type:number} x 横轴坐标(px)
b: {type:number} y 纵轴坐标(px)
c: {type:number} time 缓冲动画执行时长(ms)
d: {type:Object} easeing 缓冲函数 一般不建议修改,想修改参考源码中ease.ts
e: {type:Object} extraTransform 你想修改CSS的transfrom的属性,才需要传入此参数,具体结构

let extraTransform = {
  // 起点的属性
  start: {
    scale: 0
  },
  // 终点的属性
  end: {
    scale: 1.1
  }
}
//
bs.scrollTo(0, -60, 300, undefined, extraTransform)
```

##### 关于BackTop 的显示隐藏

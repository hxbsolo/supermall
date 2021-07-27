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



#####  推荐信息(FeatureView)![image-20210624091343760](C:\Users\huxuexia\AppData\Roaming\Typora\typora-user-images\image-20210624091343760.png)

在Home下创建子组件 Home_Recommends来进行推荐信息的 编写

通过props 从home组件获取到渲染所需的数据

#### TabControl  

在content 创建 tabcontrol 文件夹创建 TabControl创建组件,由于只是文字不同,所以没有采用插槽,而是通过父子传参props来进行

![image-20210624160251383](C:\Users\huxuexia\AppData\Roaming\Typora\typora-user-images\image-20210624160251383.png)

##### TabControl点击切换商品

通过子传父 在你点击的时候,发送一个为tabClick的事件,参数为你当前点击商品类别的下标,并在Home进行监听,使其监听到触发tabClick（tabClick分别为两个不同函数,命名重复而已）,

#### 首页商品数据请求/渲染

##### 保存商品的数据结构设计

分别有三种不同的数据需要我们进行请求,渲染

可以在data中定义一个对象goods,里面有三个对象分别对应着三种不同的数据,在这三个对象中在定义page,list属性的初始值.用来存储三种数据

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

设置page  是因为 一般当我们请求数据时,不会请求太多,不然dom加载过多,会导致页面加载变慢卡顿,甚至崩溃. 

一般会跟后端商量,比如说我请求一次给我们30条数据,或者你请求到数据了,但不要着急进行刷新,而是定时刷新出去.

那在这里 给的接口是每次请求会给你30条数据,并且返回一个page属性,代表你所请求的是那一页的数据,我们可以通过page来观察当前所请求到,以及你刷新获取的是那一页的数据   ,会出现 比如 流行 我刷新到第5页   新款 我刷新到第1页   精选我刷新到第3页等等这种情况

至于list 是我们存放每次获取的数据,这里是每获取30条数据就push 到相应的list中,并且通过vue响应式数据,实时更新

此项目API:

http://152.136.185.210:7878/api/m5

##### 进行网络请求

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

Home.vue中封装方法getHomeGoods（type）

调用getHomeGoods（‘pop’）/getHomeGoods（‘new’）/getHomeGoods（‘sell’）  //默认请求一遍,然后通过计算属性传参到goodlist组件,默认渲染pop的商品

保存数据 

```js
this.goods[type].list.push(...res.data.data.list)
//每次请求都要使page+1
this.goods[type].page += 1
```

##### 商品数据展示

封装了GoodsList组件

通过props 来传递商品数据,具体传递那个数据,我们可以通过TabControl点击保存的currentType 来决定

然后每一个商品的具体展示是通过循环封装的GoodsListitem组件

通过props给GoodsListitem传入具体的商品数据

#### Better-scroll 框架

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

2. 解决容器 动态高度

```js
//引入BetterScroll
import BetterSCroll from 'better-scroll'
//由于1x 版本不再维护 
//2x中我们需要安装一个插件来进行observe-dom 来进行动态获取scrollheight 可滚动高度,使得规定容器 动态高度中滚动
npm install @better-scroll/observe-dom --save
import ObserveDOM from '@better-scroll/observe-dom'  //配合refresh()
//在mouted阶段使用
 props:{
    a:{
      type:Number,
      default: 0
    },
    UpLoad:{
      type:Boolean,
      default: false
    }
  },
mounted(){
    let a = this.a
    let UpLoad = this.UpLoad
    let srcoll = new BetterScroll('.wrapper',{
        //通过props来确定参数,是因为probeType 启用会影响性能(官方),可以传参代表是否启用
       probeType:a  
        //true/false 通过props 来设置是否要启用上拉效果
       pullUpLoad:UpLoad,  // 2x 必须写入该参数,否则不支持上拉   //上拉触发pullingUp事件
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

##### 回到顶部

components/content/BackTop/BackTop.vue

通过监听backtop组件的点击 来进行返回顶部

但是一般是无法监听组件点击的,我们需要通过

```js
@click.native 
通过v-on修饰符 native 可以监听组件原生事件,不仅仅是点击
通过ref标记scroll组件
在scroll组件中封装了一个方法scrollTo(x,y,time)
通过this.$refs.scroll.scrollTo(x,y,time) 来进行回到顶部的效果

BackTop显示与隐藏
在home.vue中定义iShow:false
v-show绑定BackTop组件决定是否隐藏/显示
监听scroll.vue发出的scroll事件
scroll事件会默认返回一个参数(这里参数命名为position),其中包含当前滚动的x,y
this.iShow = position. y> 1000  //判断

scrollTo(a,b,c,d,e) 参数
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

##### 解决Scroll中 滚动区域高度的问题

在Better-Scroll中 不会动态的获取图片的高度,从而导致我们请求过来的图片高度,不能够获取到,导致可滚动区域的高度实际小于真正的滚动区域高度,

 方法1:------Beter-Scroll2.0中 可以通过添加observeImage :true  

<h4>开启对 wrapper 子元素中图片元素的加载的探测。无论图片的加载成功与否，都会自动调用 BetterScroll 的 refresh 方法来重新计算可滚动的宽度或者高度，新增于 v2.1.0 版本。</h4>

方法2:  Better-Scroll  方法 refresh()  调用就会动态获取图片的高度

我们通过load事件来监听图片加载,,由于涉及到非父子组件的通信,所以通过事件总线$bus

* Vue.prototype.$bus =new Vue()
* this.$bus.$emit(‘事件名称’,参数)
* this.$bus.$on(‘事件名称’,回调函数(‘参数))

在通过this.$bus 来发出事件, 然后在Home.vue中用this.$bus.$on来监听事件,从而调用Scroll中封装的refresh(),

```js
// Scroll组件中
//封装为函数是因为,调用refresh()会对性能有所影响,所以一般不开启,需要的时候在调用此函数
methods:{
    refresh(){
      this.scroll.refresh()
    },
}
```

方法3： 通过vuex  定义一个状态,每当图片加载完毕,通过commit调用mutations来对state状态进行改变,然后在Home.vue 中 通过  watch 来监听该状态,状态发生变化调用相应函数

##### 解决refresh 函数找不到的问题

当你图片加载完毕发送事件时,你的Scroll对象或许并没有创建完毕

在Scroll.vue中

```js
  this.scroll && this.scroll.refresh()
//只有当this.scroll创建完毕之后才能调用refresh方法
```

当你切换/分类/购物车/我的 再切到首页,也会发现找不到refresh

![image-20210627170842059](C:\Users\huxuexia\AppData\Roaming\Typora\typora-user-images\image-20210627170842059.png)

因为$ref 不具有响应式,当你切到分类,首页被销毁了,再回到首页,首页被创建了,其中refs在出事渲染的时候不能访问到

##### 对refresh调用频繁的问题 进行防抖函操作

防抖函数: 多次触发,取最后  debounce

节流阀: 多次触发,取最前,忽略该阶段后面的多次触发 throllte

* 防抖函数的过程

  * 如果直接调用refresh,会调用30次

  * 我们可以将refresh传入debounce函数中,返回一个新函数

  * 之后调用refresh的时候,就使用返回的新函数

  * 而新生成的函数,并不会非常频繁的调用,如果下一次执行来的非常快,那么将上次调用取消掉

  * ```js
     mounted(){
        const resh = this.debounce(this.$refs.scroll.refresh,500)
        //3.监听item中图片加载完成
        this.$bus.$on('change',()=>{
          //调用防抖函数所返回的函数
          resh()
        })
      },
    //防抖函数
    debounce(func,delay){
          let timer = null;
          return function(...args){
            if(timer) clearTimeout(timer)
              timer = setTimeout( () =>{
                func.apply(this)
              },delay)
          }
    }
    ```

##### 上拉加载更多

* Scroll.vue中监听上拉事件,触发时,发出RequestSend事件
* Home组件监听发出RequestSend事件
* 然后调用已经封装好的getHomeGoods函数

```js
    getHomeGoods(type){
        //每请求一次页码数+1,并作为参数传入
      const page = this.goods[type].page+1
      //封装好的网络请求函数
      getHomeGoods(type,page).then(res=>{
        //通过扩展运算符,将请求过来的商品数组,转换为逗号分隔的序列,并push相应type对象里面的list
        this.goods[type].list.push(...res.data.data.list)
          //列表内部的page++
        this.goods[type].page++
        //获取TabControl需title
        this.titles = [...res.data.data.filter.list]
        //调用在scrool中封装的函数,结束相应上拉加载效果
        this.$refs.scroll.finishPullUp()
      })
    },
```

##### 关于TabControl的  CSS属性 position: sticky;  失效的解决

相当于relative 与  fixed 的结合  并且可以自动监听scroll事件,当年你并没滚动到指定位置,比如top:20px;它会相当于relative效果,而滚到指定位置,就变为了fixed效果  -webkit-sticky

使用条件：
1、父元素不能overflow:hidden或者overflow:auto属性。
2、必须指定top、bottom、left、right4个值之一，否则只会处于相对定位
3、父元素的高度不能低于sticky元素的高度
4、sticky元素仅在其父元素内生效

##### TabControl的吸顶效果

##### 获取TabCpmtrp的offsetTop

必须要知道滚动到多少时,启动吸顶效果,

##### 问题所在

如果直接通过mounted中获取到TabControl 的offsetTop,这个值是不正确的

要知道我们使用了BetterScroll框架,然而在TabControl上面大概分为轮播图,推荐信息,以及本周流行这些都是我们请求过来再进行加载的图片,还记得上面讲BetterScrol吗?,它不能够动态的获取到非固定宽高的图片,所以可能你获取的offsetTop值,会是缺少了轮播图加载的图片等等高度,所以是错误的.

![image-20210630221404441](C:\Users\huxuexia\AppData\Roaming\Typora\typora-user-images\image-20210630221404441.png)

##### 解决方案

* 监听HomeSwiper中图片的加载完成
* 加载完成后,发出事件,在Home中,获取正确的offsetTop值
* 为了不让HomeSwiper多次发出事件,可以使用isLoad 来保存状态,只需要发出一次
* 注意:这里不进行多次调用和debanuce

```js
this.$refs.tabControl.$el.offsetTop 这个时候获取的offsetTop就比较准确了
```

##### 监听滚动,动态改变TabControl的样式

* 问题:动态改变TabControl 样式时, 会出现两个问题

  * 问题一:下面的商品内容,会突然上移
  * 问题二:TabControl 虽然设置了fixed,但还是会跟Better-Scroll一起滚上去了

* 其他方案来解决停留问题.

  * 导航栏下,复制粘贴一份PTabControl组件对象,利用它来实现停留效果.
  * 当用户滚动到一定位置时,PTabControl显示出来,当滚动没有达到一定位置时,PTabControl隐藏起来

* 其它问题  组件的数据具有作用域,导致我们在点击TabControl这两个组件的时候,会造成,点击所添加的类名不相同.

* 解决方案

* ```js
  
  //当点击会传过来index,这里需要给两个tabcontrol都重新赋值 currentIndex,是因为,虽然是同一个组件,但是两个组件中的数据,并不互通,都有自己相应的作用域.
  this.$refs.tabcontrol1.$data.currentIndex = index
  this.$refs.tabcontrol.$data.currentIndex = index
  ```



<template>
  <div id="home">
    <nav-bar class="home_nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <BackTop @click.native="backClick()" v-show="isShow"></BackTop>
    <TabControl ref = 'tabcontrol1' :titles="titles"  @tabClick="tabClick" class="tabcontrol" v-show="isTabFixed" />
    <Scroll class="content" ref="scroll" :a="3" @scroll="contentScroll" @RequestSend="LoadMore" :UpLoad="true">
      <HomeSwiper :banners="banners" @SwiperImageLoad="ImageLoad"/>
      <HomeRecommendedView :recommends="recommends"/>
      <HomeFeatureView/>
      <TabControl ref = 'tabcontrol' :titles="titles"  @tabClick="tabClick"/>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
  </div>
</template>
<script>
//关于home的子组件存储在home目录下的childComps
//关于home的网络请求封装在network中的home.js
//引入Navbar
import NavBar from 'components/common/navbar/Navbar.vue'
//引入TabControl组件
import TabControl from "components/content/tabControl/Tab_Control";
//引入首页商品展示
import GoodsList from "components/content/goods/Goods_list.vue";
//引入Scroll组件,进行滚动效果
import Scroll from "components/common/scroll/Scroll.vue"
//引入回到顶部相关组件
import BackTop from "components/content/BackTop/BackTop.vue"




//引入HomeSwiper 轮播图组件
import HomeSwiper from './childComps/Home_Swiper'
//引入推荐信息组件HomeRecommendsViews
import HomeRecommendedView from "./childComps/Home_RecommendedView";
//引入流行列表组件
import HomeFeatureView from "./childComps/Home_FeatureView";

//引入home相关网络请求函数
import {getHomeMultidata,getHomeGoods} from "network/home";
//防抖函数
import {debounce} from "common/utils";

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommendedView,
    HomeFeatureView,
    GoodsList,
    Scroll,
    BackTop
  },
  //垃圾回收机制,只要对象不被引用就会被回收掉,而我们这里的data中对象会一直被此组件引用,所以不会被回收掉
  data() {
    return {
      // result:null,
      banners: [],
      recommends: [],
      titles: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed:false,
    }
  },
  created() {
    // 1. 请求轮播图数据
    this.getHomeMultidata()
    // 2. 请求相应商品数据
    this.getHomeGoods('pop')

    this.getHomeGoods('new')

    this.getHomeGoods('sell')
  },
  mounted() {
    //3.监听item中图片加载完成
    const resh = debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('change', () => {
      //调用防抖函数所返回的函数
      resh()
    })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    //此时type存储到currentType
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      //当点击会传过来index,这里需要给两个tabcontrol都重新赋值 currentIndex,是因为,虽然是同一个组件,但是两个组件中的数据,并不互通,都有自己相应的作用域.
      this.$refs.tabcontrol1.$data.currentIndex = index
      this.$refs.tabcontrol.$data.currentIndex = index
    },
    //请求轮播图和推荐信息数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //这里的res在你函数调用完毕之后,就会被回收了,其中的数据由于没有别的东西引用他,也不会回收掉,
        // 而我们通过了将数据赋值到我们所定义的变量中,当此数据要被回首的时候,会发现还有东西在引用他,从而使数据保留下来
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
        this.result = res
        //此时获取不到result 但是 由于上面函数为异步,
        //console操作 会在上面函数执行就会打印,导致为数据没有,
        //但我们可以通过 devtools 来观察数据
        //数据其实是发生了变化,result 中有了数据
        // console.log(this.result)
      })
    },
    //请求相应商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page++
        // 获取TabControl需title
        this.titles = [...res.data.data.filter.list]
        //调用在scrool中封装的函数,完成相应上拉加载效果
        this.$refs.scroll.finishPullUp()
      })
    },
    //返回顶部
    backClick() {
      //通过ref属性来拿到 我们创建的BetterScroll对象
      //通过BetterScroll对象的scrollTo方法来实现回到顶部
      this.$refs.scroll && this.$refs.scroll.ScrollTo(0, 0)
    },
    //监听BetterScroll scroll
    contentScroll(p) {
      //1.判断BackTop是否显示
      this.isShow = p.y < -1000;
      //2.决定TabControl是否吸顶
      this.isTabFixed = p.y<-this.tabOffsetTop
    },
    //上拉发送请求数据
    LoadMore() {
      this.getHomeGoods(this.currentType)
      // const more =debounce(this.getHomeGoods,500)
      // more(this.currentType)
    },
    //监听轮播图图片的加载
    ImageLoad() {
      //所以组件都有一个属性叫做$el,用来获取组件相对应的Dom对象
      //这个时候在获取offsetTop就比较的准确了
      //保存TabControl的正确offsetTop
      this.tabOffsetTop = this.$refs.tabcontrol.$el.offsetTop
    }
  },
}
</script>
<style scoped>
.tabcontrol{
  background: #FFFFFF;
  position: relative;
  z-index: 9;
}
.home_nav{
  background-color: var( --color-tint);
  color: var(--color-background);
  position: relative;
  z-index:9;
}
#home{
  height: 100vh;
  position: relative;
  /*vh 视口高度*/
}
.content{
  height: calc(100% - 93px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
}
</style>

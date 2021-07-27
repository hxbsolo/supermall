<template>
  <div class="goods-item">
    <img :src="list.showLarge.img" alt="" @load="Load">
    <div class="goods-info">
      <p>{{ list.title }}</p>
        <span class="price">{{list.price}}</span>
        <span class="collect">{{list.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Goods_listitem",
  props:{
    list:{
      type:Object,
      default(){
        return []
      }
    }
  },
  methods:{
    Load(){
      this.$bus.$emit('change')
    }
  }
}
</script>

<style>
.goods-item{
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}
.goods-item img{
  width: 100%;
  height:100%;
  border-radius: 5px;
}
.goods-info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect{
  position:relative;
}
.goods-info .collect::before{
  content: '';
  position: absolute;
  left: -15px;
  bottom: .1rem;
  width: 14px;

  height: 14px;
  display: inline-block;
  background: url('~assets/img/common/collect.svg') no-repeat;
  background-size: 100%;
}
</style>

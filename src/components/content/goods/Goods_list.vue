<template>
  <div class="goods">
    <Goodslistitem v-for="item in goods" :list="item" />
  </div>
</template>

<script>
import Goodslistitem from "@/components/content/goods/Goods_listitem";
export default {
  name: "good_list",
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Goodslistitem
  },
}
</script>

<style>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;  /*均等分*/
}
</style>

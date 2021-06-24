<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend_item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home_RecommendedView",
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  font-size: 12px;
  text-align: center;
  padding:10px 0 20px ;
  border-bottom: 8px solid #eee;
}
.recommend_item{
  flex: 1;
}
.recommend_item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>

<template>
  <div class="tab_control" ref="tabcon">
    <div v-for="(item,index) in titles" class="tab_control_item" :class="{active:index==currentIndex?'active':''}">
      <span @click="itemClick(index)">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex: 0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  },
}
</script>

<style scoped>
.tab_control{
  display: flex;
  text-align: center;
  padding: 5px;
}
.tab_control_item{
  flex: 1;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
.active{
  color: var(--color-tint);
}
.active span {
  border-bottom: 2px solid var(--color-tint);
  padding: 5px;
}
</style>

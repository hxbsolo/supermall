<template>
<!-- item -->
      <div class="tab-item" @click='itemClick'>
        <div v-if = !ishow><slot name='item-icon'></slot></div>
        <div v-else><slot name='item-icon-active'></slot></div>
        <div :style='activestyle'><slot name='item-text'></slot></div>
      </div>
</template>
<script>
export default {
  name: 'Tabbar',
  data(){
    return {
      // ishow: false
    }
  },
  props: {
    link: String,
    activecolor: {
      type: String,
      default: 'red'
    }
  },
  methods: {
    itemClick(){
      this.$router.push(this.link).catch(err=>err)
    }
  },
  computed: {
    ishow:{
      get(){
        return  this.$route.path.indexOf(this.link) !==-1
      },
      set(){
        return  this.$route.path.indexOf(this.link) !==-1
      }
    },
    activestyle:{
      get(){
        return this.ishow? {color: this.activecolor}:{}
      },
      set(){
        return this.ishow? {color: this.activecolor}:{}
      }
    }
  }

}
</script>
<style scoped>
  .tab-item {
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 12px;
  }
  .tab-item img{
    width: 24px;
    height: 24px;
    margin-top: 4px;
    vertical-align: middle;
  }

</style>

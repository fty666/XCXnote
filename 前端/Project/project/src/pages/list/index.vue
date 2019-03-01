<template>
  <div>
    <ali class="img_cha" ref="aliComponent" @getUrl="imgUrl1($event, 1)"
            :fileNumber="1"
            :imgWidth="150" :imgHeight="150"
            :defaultImg="addList.profile"></ali>
  </div>
</template>

<script>
  import ali from '@/components/upload-ali.vue';
  export default {
    components:{
      ali
    },
    data(){
      return {
        addList:{
          profile:'lll'
        }
      }
    },
    methods: {
      //  添加图片
      imgUrl1(e) {
        this.addList.profile = e[0];
      },
      get() {
        this._getData('redwine/goodsClass/getPlace', {}, data => {
          console.log(data)
        })
      }
    },
    created() {
      this.get();
    }
  }
</script>

<style scoped>
</style>

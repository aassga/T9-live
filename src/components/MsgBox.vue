<template>
  <div class="msg__box">
    <div class="msg__box--bg">
      <div class="msg__box--content">{{ msgText }}</div>
      <div class="msg__box--bottom">
        <div class="submit" @click="onSubmit" v-if="okButtom">{{$t('OK')}}</div>
        <div class="cancel" @click="cancel" v-if="noButtom">{{$t('Cancel')}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "msgBox",
  props: {
    msgText: {
      type: String,
    },
    okButtom:{
      type: Boolean,
    },
    noButtom:{
      type: Boolean,      
    }
  },
  data() {
    return {
  
    };
  },
  methods: {
    onSubmit(){
      this.$emit('onSubmit')
    },
    cancel(){
      this.$emit('cancel')
    }
  },
};
</script>
<style lang="scss" scoped>
.msg{
  &__box{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &--bg{
      width: 70%;
      height: 115px;
      background: url("./../../static/msg/Frame_BG.png") no-repeat;
      background-size: 100% 100%;
    }
    &--content{
      width: 100%;
      height: 65px;
      line-height: 65px;
      text-align: center;
    }
    &--bottom{
      display: flex;
      justify-content: center;
      .submit{
        width: 80px;
        height: 30px;
        line-height: 30px;
        background: url("./../../static/msg/Button_Red.png") no-repeat;
        background-size: contain;
        background-position: center;
        margin: 0 10px;
        text-align: center;
        text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
      }
      .cancel{
        width: 80px;
        height: 30px;
        line-height: 30px;
        background: url("./../../static/msg/Button_Black.png") no-repeat;
        background-size: contain;
        background-position: center;
        margin: 0 10px;
        text-align: center;
      }
    }
  }
}
</style>
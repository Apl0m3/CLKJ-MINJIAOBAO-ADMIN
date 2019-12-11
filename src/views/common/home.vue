<template>
  <div>
    <div class="homeCenter">
      <img src="../../../static/img/DINGZHIWANG.jpg" alt="">
<!--      <h3>欢迎登录</h3>-->
<!--      <p>全球定制网后台管理系统</p>-->
    </div>
    <div class="homeBlock" v-if="dataForm.isShow"></div>
    <div class="homePopup" v-if="dataForm.isShow">
      <div class="homePopupTitle"><p>{{dataForm.title}}</p><i @click="close()">×</i></div>
      <p class="homePopupCen">{{dataForm.content}}</p>
      <p class="homePopupBot">联系售后: 杜春容  售后电话:18375986010</p>
    </div>

  </div>


</template>

<script>
  import {logisticssmsnum} from '@/action/logisticssmsnum'
  export default {
    data () {
      return {
        dataForm:{
          isShow:false,
          title:'',
          content:''
        },

      }
    }, beforeRouteEnter(to,from,next) {
      next(vm=>{
        vm.getLogisticsSmsNum();
      });
    },
    methods:{
      getLogisticsSmsNum(){
        logisticssmsnum.getLogisticsSmsNum().then(({data}) => {
          if(data && data.code==200){
            if(data.type==1){
              this.dataForm.isShow=true;
              this.dataForm.title='短信提醒通知';
              this.dataForm.content='发送短信功能未开通，请尽快联系售后开通'
            }else if(data.type==2){
              this.dataForm.isShow=true;
              this.dataForm.title='物流提醒通知';
              this.dataForm.content='物流查询功能未开通，请尽快联系售后开通'
            }else if(data.type==3){
              this.dataForm.isShow=true;
              this.dataForm.title='续费提醒通知';
              this.dataForm.content='当前系统短信/查询物流即将使用完毕，请及时联系售后续费'
            }
          }
        });
      },close(){
        this.dataForm.isShow=false;
      }
    }

  }
</script>

<style scoped>
  >>>.el-card__body{position: relative}
.homeCenter{text-align: center;margin-top: 12%}
.homeCenter img{width: 600PX}
.homeCenter h3{font-size: 50px;color: #333;margin: 20px 0}
.homeCenter p{font-size: 38px;color: #999;margin: 20px 0}
.homePopup{width: 500px;height: 200px;background-color: #fff;position: absolute;top:50%;left:50%;margin-top:-100px;margin-left:-250px;z-index: 2;}
.homePopup .homePopupTitle{display: flex;justify-content: space-between;align-items: center;width: 100%;height: 50px;background-color: #03BA8A;}
.homePopup .homePopupTitle p{font-size: 18px;margin-left: 15px;color: #fff;}
.homePopup .homePopupCen{margin: 50px 0 0 30px;font-size: 14px;color: black}
.homePopup .homePopupTitle i{font-size: 40px;margin-right: 15px;color: #fff;}
.homePopup .homePopupBot{position: absolute;bottom: 10px;right: 15px;font-size: 14px;color: black}
.homeBlock {width:100%;height:100%;position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index: 1;background-color: rgba(0,0,0,0.5)}
</style>


<template>
  <div>
    <div class="title">
        文安县医院处方缴费
    </div>
    <div class="content">
      <!-- <p>请先填写身份证号：</p> -->
      <Input v-model="value" placeholder="请输入就诊卡号" style="width: 300px" /><br>
      <Button type="success" class="bttnn" @click="goIndex1">查询处方信息</Button>
    </div>
  </div>
</template>

<script>
import http from './../utils/http';
var a = 0;
 var code = '';
  export default {
    data(){
      return {
        value:''
      }
    },
    methods: {
      goIndex1(){
        if(this.value!=''){
          this.$router.push(`/list?cardId=${this.value}`)
        }else{
          this.$Message.error('请输入就诊卡号');
        }
        
      },
      getCode () {
        // 获取页面url
        var url = window.location.href
        var appid = 'wx4ea558327789503d'
        // 截取code
        code = this.getUrlCode().code; 
        // 如果没有code，则去请求
        if ((code == null || code === '') && a==0) { 
            // var url  = local.split('#')[0];
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
            a=1
        } else {
             this.gettoken();
        }
      },
       async gettoken(){
          var url = "getOpenID";
          var data ={
              code:code
          };
          var res = await http.post(this,url,data);
          if(res.errcode===0){
            localStorage.setItem('openid',res.data.openid);
          }
        },
      getUrlCode() { 
        var url = location.search
        var theRequest = new Object()
        if (url.indexOf("?") != -1) {
          var str = url.substr(1)
          var strs = str.split("&")
          for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
          }
        }
        return theRequest
      },
    },
    created(){
      var openid  = localStorage.getItem('openid');
      if(openid==null||openid==undefined){
        this.getCode();
      }
    }
  }
</script>

<style lang="scss" scoped>
.title{
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #28b8a1;
  font-size: 20px;
  text-align: center;
  color: #fff;
}
.content{
  padding-top: 100px;
  text-align: center;
   font-size: 16px;
  p{
    padding: 20px 0;
  }
  .bttnn{
    width: 300px;
     background: #28b8a1;
    height: 35px;
    margin-top: 20px;
  }
}
</style>
<template>
    <div>
        <div class="title">
            支付订单
        </div>
        <div class="payFee">
            <p class="p1">支付金额</p>
            <p class="p2">￥{{totalFee}}</p>
        </div>
        <div class="bottombtn">
            <div class="paybutton" @click="payfee()">
                支付
            </div>
        </div>
        <div class="zhe" v-if="isShow">
            <div class="model">
                <div class="txt">
                    如需发票，请持就诊卡去门诊收费大厅交费窗口打印!
                </div>
                <div class="bottom" @click="goHome">
                    确定
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk';
import http from './../utils/http';
import {hidemenu} from './../common/wxConfig'
const requesturl= "getJSSDKConfig";
 hidemenu(requesturl);
    export default {
        data(){
            return{
                orderNo:'',
                totalFee:0.00,
                isShow:false
            }
        },
        created(){
            this.orderNo = this.$route.query.orderNo;
            this.totalFee = this.$route.query.totalFee;
        },
        methods:{
            //点击发起支付
           async payfee(){
                var url = 'pay';
                var data = {
                    orderId:this.orderNo
                }
                var res = await http.post(this,url,data);
                if(res.errcode===0){
                    var data = {};
                    data.timeStamp = res.data.timeStamp;
                    data.nonceStr = res.data.nonceStr;
                    data.paySign = res.data.paySign;
                    data.signType = res.data.signType;
                    data.packages = res.data.package;
                    this.invokingPay(data);
                }
            },
            goHome(){
                this.$router.push('/');
            },
            //支付
            invokingPay(data){
                var that = this;
                let {
                    // appId: appId, 
                    timeStamp,
                    nonceStr,
                    packages,
                    paySign,
                    signType
                } = data;
                wx.ready(function() {
                    wx.chooseWXPay({
                        // appId: appId, // 必填，公众号的唯一标识
                        timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
                        package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: paySign, // 支付签名
                        success: function(res) {
                             that.$Message.info('支付完成');
                             that.isShow=true;
                        },
                        fail: function(res) {

                        }
                    });
                });
                wx.error(function(res) {
                    console.log(res);
                });
    
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
.payFee{
    width: 90%;
    height: 120px;
    margin: 20px auto;
    background-image: url('./../common/img/beijng.png') ;
    background-repeat: no-repeat;
    background-size:100% 100%; 
    text-align: center;
    overflow: hidden;
     border-radius: 5px;
    .p1{
        padding-top: 20px;
        color: #fff;
        font-size: 16px;
        
    }
    .p2{
        padding-top: 10px;
        color: #fff;
        font-size: 16px;
       
        
    }
}
.bottombtn{
    width: 100%;
    position: fixed;
    bottom: 100px;
}
.paybutton{
    width: 70%;
    height: 40px;
    border-radius: 50px;
    background: #28b8a1;
    text-align: center;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
    margin: 0 auto;
}
.zhe{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
}
.model{
    background: #fff;
    color: rgb(24,24,24);
    width: 60%;
    height: 150px;
    /* padding: 20px; */
    margin: 150px auto;
    position: relative;
    border-radius: 10px;
}
.txt{
    padding: 40px 20px 20px 20px;
}
.bottom{
    text-align: center;
    padding: 10px 0;
    border-top: 1px solid rgb(238,238,238);
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
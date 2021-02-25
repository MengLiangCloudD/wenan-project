import wx from "weixin-js-sdk";
import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = '/api';

const hidemenu= async (requesturl)=>{
    let url1 = location.href;
    var url = requesturl;
    var token  = localStorage.getItem('token');
    var data ={
        url:url1
    }
   await axios({
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url: url,
        data: qs.stringify(data), 
        timeout: 10000,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
            token:token,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(function (res) {
        console.log(res)
          //验证微信环境
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature, // 必填，签名，见附录1
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      }).catch(function (err) {
        
        // console.log(err);
      })
}
export {hidemenu}
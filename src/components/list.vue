<template>
    <div>
        <div class="title">
            处方列表
        </div>
        <div class="content">
            <div class="item" v-for="(item,index) in list" :key="index">
                <div class="item_title" @click="goInfo(item)">
                    {{item.type}}
                    <img src="./../common/img/hei.png" class="hei" alt="">
                </div>
                <div class="item_content">
                    <p>{{item.createTime}}</p>
                    <p><span>处方单号：</span><span>{{item.serial}}</span></p>
                    <p><span>处方价格：</span><span>￥{{item.fee}}</span></p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="heji">
                合计：￥{{totalFee}}
            </div>
            <div class="payButton" @click="generateOrder()">
                支付
            </div>
        </div>
    </div>
</template>

<script>
import http from './../utils/http';
    export default {
        data(){
            return {
                list:[],
                totalFee:0.00,
                date:''
            }
        },
        methods:{
            async getList(){
                var url = 'queryFeeByCardId';
                var cardId = this.$route.query.cardId;
                var data = {
                    cardId
                }
                var res = await http.post(this,url,data);
                if(res.errcode === 0&&res.data!==null){
                    this.list = res.data.list;
                    this.totalFee = res.data.totalFee;
                    this.date = res.data.date;
                }else{
                    this.list = []
                }
            },
            //下单
            async generateOrder(){
                var url = 'generateOrder';
                var list = this.list;
                var cardId = this.$route.query.cardId;
                var  totalFee  = this. totalFee;
                if(list.length<=0){
                    this.$Message.error('您暂无处方信息');
                    return
                }
                var data = {
                    cardId,totalFee,list:JSON.stringify(list),openid:localStorage.getItem('openid')
                }
                var res = await http.post(this,url,data);
                if(res.errcode===0){
                    this.$router.push(`/pay?orderNo=${res.data}&totalFee=${this.totalFee}`)
                }else{
                     this.$Message.error(res.errmsg);
                    
                }
            },
            goInfo(item){
                this.$router.push(`/listInfo?item=${JSON.stringify(item)}`)

            }
        },
        created(){
            this.getList();
        }
    }
</script>

<style lang="scss" scoped>
.title{
  width: 100%;
  height: 60px;
  line-height: 60px;
  background:  #28b8a1;
  font-size: 20px;
  text-align: center;
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 999;
}
.content{
    width: 100%;
    min-height: calc(100% - 100px);
    position: absolute;
    background: rgb(238,238,238);
    padding-bottom: 100px;
    margin-top: 60px;
}
.item{
    background: rgb(255,255,255);
    width: 95%;
    margin: 0 auto;
    padding: 10px 20px;
    border-radius: 3px;
    margin-top: 10px;
    color: rgb(24, 24, 24);
}
.item_title{
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(238,238,238);
    padding-left: 10px;
    position: relative;
}
.item_content{
    padding-top:5px;
     padding-left: 10px;
     p{
         line-height: 1.7;
     }
}
.bottom{
    background: #fff;
    /* padding: 10px 0 20px 0; */
    text-align: right;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
}
.heji{
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    color: rgb(24, 24, 24);
    margin-right: 20px;

}
.payButton{
    width: 100px;
    height: 50px;
    line-height: 50px;
    background: #28b8a1;
    color: #fff;
    text-align: center;
    /* border-radius: 50px; */
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    /* margin-right: 10px; */
}
.hei{
    width: 8px;
    height: 15px;
    position: absolute;
    top: 5px;
    right: 10px;
}
</style>
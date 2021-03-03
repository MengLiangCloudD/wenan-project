<template>
    <div>
        <div class="title">
            处方详情
            <img src="./../common/img/bai.png" class="bai" alt="" @click="goList()">
        </div>
        <div class="content">
            <div class="item" >
                <div class="item_title">
                    {{item.type}}
                </div>
                <div class="item_content">
                    <p>{{item.createTime}}</p>
                    <p><span>用户姓名：</span><span>{{list[0].name}}</span></p>
                    <p><span>用户卡号：</span><span>{{list[0].cardNo}}</span></p>
                    <p><span>处方单号：</span><span>{{item.serial}}</span></p>
                    <p><span>处方价格：</span><span>￥{{item.fee}}</span></p>
                </div>
                <div class="content_bottom" v-for="(item,index) in list" :key="index">
                    <div class="bottom_item">
                        {{item.projectName}}
                    </div>
                    <div class="bottom_item">
                        ￥{{item.price}}
                    </div>
                    <div class="bottom_item">
                        x{{item.number}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from './../utils/http';
    export default {
        data() {
            return {
                list:[{
                    createTime:'2010-2010',
                    type:'中药',
                    serial:'1222',
                    fee:'0.12'
                }],
                item:{}
            }
        },
        created(){
           this.item = JSON.parse(this.$route.query.item); 
           this.selectInfo();
        },
        methods:{
            goList(){
               history.go(-1);
            },
            async selectInfo(){
                var url = 'queryInfo';
                var data ={
                    serial:this.item.serial
                }
                var res = await http.post(this,url,data);
                if(res.errcode === 0 && res.data!==null){
                    this.list = res.data;
                }else{
                    this.list=[]
                }
            }
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
.bai{
    position: absolute;
    width: 12px;
    left: 15px;
    top: 20px;
}
.content{
  width: 100%;
  min-height: calc(100% - 60px);
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
}
.item_content{
    padding-top:5px;
     padding-left: 10px;
     padding-bottom: 10px;
      border-bottom: 1px solid rgb(238,238,238);
     p{
         line-height: 1.7;
     }
}
.content_bottom{
    padding-top: 10px;
    display: flex;
     display:-webkit-box;
     padding-left: 10px;
}
.bottom_item{
    width: 30%;
    margin-right: 1%;
}
</style>
<template>
  <div class="header_container">
    <b-breadcrumb class="mt-2">
      <b-breadcrumb-item to="manage">首页</b-breadcrumb-item>
      <b-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</b-breadcrumb-item>
    </b-breadcrumb>

    <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret class="mr-3">
      <template slot="button-content">
        <img :src="baseImgPath + adminInfo.avatar" class="avator" />
      </template>
      <b-dropdown-item to="manage">首页</b-dropdown-item>
      <b-dropdown-item @click="handleCommand">退出</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { signout } from "@/api/getData"; //请求拿到
import { baseImgPath } from "@/config/env"; //拿Path
import { mapActions, mapState } from "vuex"; //拿用户头像

export default {
  data() {
    return {
      baseImgPath
    };
  },
  created() {  //生命周期  判断激活Vuex中的getAdminData  commit  更新数据
    if (!this.adminInfo.id) {
      this.getAdminData();   
    }
  },
  computed: {
    ...mapState(["adminInfo"])  //Vuex  State
  },
  methods: {
    ...mapActions(["getAdminData"]), //Vuex Actions
    async handleCommand() {
      const res = await signout();  //接收请求到的数据
      console.log(res);
      if (res.status == 1) {   //如果状态成功  
        this.$router.push({  //提示成功则跳转通传值给login
          name: "login",
          params: {
            outusername: "outmanage"
          }
        });
      } else {    //失败
		   this.$bvToast.toast(res.message, {  //提示失败
            title: "错误提示",
            autoHideDelay: 2000,
            variant: "danger",
            toaster: "b-toaster-top-center"
          });
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #e7eaed;
  height: 60px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding-left: 13px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 30px;
}
</style>

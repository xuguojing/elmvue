<template>
  <b-container fluid class="fillcontain">
    <b-row style="height: 100%;">
      <!-- 菜单栏 -->
      <b-col cols="2" style="min-height: 100%; background-color: #324057;">
        <div role="tablist">
          <b-list-group>
            <b-list-group-item href="#some-link" >Awesome link</b-list-group-item>
            <b-list-group-item href="#" active>Link with active state</b-list-group-item>
            <b-list-group-item href="#">Action links are easy</b-list-group-item>
            <b-list-group-item href="#foobar" disabled>Disabled link</b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
      <b-col cols="8" style="height: 100%;overflow: auto;">2 of 3</b-col>
    </b-row>
  </b-container>
</template>

<script>
import Pubsub from "pubsub-js";
export default {
  data() {
    return {};
  },
  created() {
    var that = this;
    if (that.$route.params.username === "manage") {
      that.$bvToast.toast("登陆成功", {
        title: "成功提示",
        toaster: "b-toaster-top-center",
        autoHideDelay: 3000,
        variant: "success"
      });
    }
  }
};
</script>


<style lang="less" scoped>
@import "../style/mixin";
</style>

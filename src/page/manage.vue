<template>
  <b-container fluid class="fillcontain">
    <b-row style="height: 100%;">
      <!-- 菜单栏 -->
      <b-col cols="2" style="min-height: 100%; background-color: #B8DAFF;">
        <b-row>
          <div role="tablist" style="width:100%">
            <b-list-group>
              <b-list-group-item variant="primary" button>首页</b-list-group-item>
              <b-list-group-item variant="primary" v-b-toggle.accordion-1 button>数据管理</b-list-group-item>
              <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                <b-list-group style="font-size: 10px;">
                  <b-list-group-item variant="info" button>用户列表</b-list-group-item>
                  <b-list-group-item variant="info" button>食品列表</b-list-group-item>
                  <b-list-group-item variant="info" button>商家列表</b-list-group-item>
                  <b-list-group-item variant="info" button>订单列表</b-list-group-item>
                  <b-list-group-item variant="info" button>管理员列表</b-list-group-item>
                </b-list-group>
              </b-collapse>
              <b-list-group-item variant="primary" v-b-toggle.accordion-2 button>添加数据</b-list-group-item>
              <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
                <b-list-group style="font-size: 10px;">
                  <b-list-group-item variant="info" button>添加商铺</b-list-group-item>
                  <b-list-group-item variant="info" button>添加商品</b-list-group-item>
                </b-list-group>
              </b-collapse>
              <b-list-group-item variant="primary" v-b-toggle.accordion-3 button>图表</b-list-group-item>
              <b-collapse id="accordion-3" visible accordion="my-accordion" role="tabpanel">
                <b-list-group style="font-size: 10px;">
                  <b-list-group-item variant="info" button>用户分布</b-list-group-item>
                </b-list-group>
              </b-collapse>
              <b-list-group-item variant="primary" v-b-toggle.accordion-4 button>编辑</b-list-group-item>
              <b-collapse id="accordion-4" visible accordion="my-accordion" role="tabpanel">
                <b-list-group style="font-size: 10px;">
                  <b-list-group-item variant="info" button>文本编辑</b-list-group-item>
                </b-list-group>
              </b-collapse>
              <b-list-group-item variant="primary" v-b-toggle.accordion-5 button>设置</b-list-group-item>
              <b-collapse id="accordion-5" visible accordion="my-accordion" role="tabpanel">
                <b-list-group style="font-size: 10px;">
                  <b-list-group-item variant="info" button>管理员设置</b-list-group-item>
                </b-list-group>
              </b-collapse>
              <b-list-group-item variant="primary" v-b-toggle.accordion-6 button>说明</b-list-group-item>
              <b-collapse id="accordion-6" visible accordion="my-accordion" role="tabpanel">
                <b-list-group style="font-size: 10px;">
                  <b-list-group-item variant="info" button>说明</b-list-group-item>
                </b-list-group>
              </b-collapse>
            </b-list-group>
          </div>
        </b-row>
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

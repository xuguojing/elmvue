<template>
  <b-container fluid class="fillcontain">
    <b-row style="height: 100%;">
      <!-- 菜单栏 -->
      <b-col style="min-height: 100%; background-color: #C6C8CA;">
        <b-row>
          <div role="tablist" style="width:100%;">
            <b-list-group>
              <b-list-group-item variant="dark" to="/manage">
                <i class="iconfont icon-shouye"></i>首页
              </b-list-group-item>
              <b-list-group-item variant="dark" v-b-toggle.accordion-1 button>
                <i class="iconfont icon-shujuguanli"></i>数据管理
              </b-list-group-item>
              <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                <b-list-group style="font-size:12px;">
                  <b-list-group-item
                    variant="secondary"
                    to="/userList"
                    class="d-flex justify-content-center align-items-center"
                  >用户列表</b-list-group-item>
                  <b-list-group-item
                    variant="secondary"
                    to="/foodList"
                    class="d-flex justify-content-center align-items-center"
                  >食品列表</b-list-group-item>
                  <b-list-group-item
                    variant="secondary"
                    to="/shopList"
                    class="d-flex justify-content-center align-items-center"
                  >商家列表</b-list-group-item>
                  <b-list-group-item
                    variant="secondary"
                    to="/orderList"
                    class="d-flex justify-content-center align-items-center"
                  >订单列表</b-list-group-item>
                  <b-list-group-item
                    variant="secondary"
                    to="/adminList"
                    class="d-flex justify-content-center align-items-center"
                  >管理员列表</b-list-group-item>
                </b-list-group>
              </b-collapse>
              <b-list-group-item variant="dark" v-b-toggle.accordion-2 button>
                <i class="iconfont icon-ziyuanbaosongtianjiashuju"></i>添加数据
              </b-list-group-item>
              <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                <b-list-group style="font-size:12px;">
                  <b-list-group-item
                    variant="secondary"
                    to="/addShop"
                    class="d-flex justify-content-center align-items-center"
                  >添加商铺</b-list-group-item>
                  <b-list-group-item
                    variant="secondary"
                    to="/addGoods"
                    class="d-flex justify-content-center align-items-center"
                  >添加商品</b-list-group-item>
                </b-list-group>
              </b-collapse>
              <b-list-group-item variant="dark" v-b-toggle.accordion-3 button>
                <i class="iconfont icon-tubiao"></i>图表
              </b-list-group-item>
              <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                <b-list-group style="font-size:12px;">
                  <b-list-group-item
                    variant="secondary"
                    to="/visitor"
                    class="d-flex justify-content-center align-items-center"
                  >用户分布</b-list-group-item>
                </b-list-group>
              </b-collapse>
              <b-list-group-item variant="dark" v-b-toggle.accordion-4 button>
                <i class="iconfont icon-tianxie"></i>编辑
              </b-list-group-item>
              <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                <b-list-group style="font-size:12px;">
                  <b-list-group-item
                    variant="secondary"
                    to="/vueEdit"
                    class="d-flex justify-content-center align-items-center"
                  >文本编辑</b-list-group-item>
                </b-list-group>
              </b-collapse>
              <b-list-group-item variant="dark" v-b-toggle.accordion-5 button>
                <i class="iconfont icon-shezhi"></i>设置
              </b-list-group-item>
              <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
                <b-list-group style="font-size:12px;">
                  <b-list-group-item
                    variant="secondary"
                    to="/adminSet"
                    class="d-flex justify-content-center align-items-center"
                  >管理员设置</b-list-group-item>
                </b-list-group>
              </b-collapse>
              <b-list-group-item variant="dark" v-b-toggle.accordion-6 button>
                <i class="iconfont icon-shuoming"></i>说明
              </b-list-group-item>
              <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
                <b-list-group style="font-size:12px;">
                  <b-list-group-item
                    variant="secondary"
                    to="/explain"
                    class="d-flex justify-content-center align-items-center"
                  >说明</b-list-group-item>
                </b-list-group>
              </b-collapse>
            </b-list-group>
          </div>
        </b-row>
      </b-col>
      
      <!--视图-->
      <b-col cols="10" style="height: 100%;overflow: auto;">
        <b-row >
          <keep-alive>
            <router-view style="width:100%;"></router-view>
          </keep-alive>
        </b-row>
      </b-col>

    </b-row>
  </b-container>
</template>

<script>
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
        autoHideDelay: 2000,
        variant: "success"
      });
      this.tomanage();
    }
  },
  methods: {
    tomanage() {
      this.$router.push("manage");
    }
  }
};
</script>


<style lang="less" scoped>
@import "../style/mixin";
</style>

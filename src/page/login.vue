<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>elm后台管理系统</p>
        </div>

        <!-- from -->
        <div>
          <b-form @submit.prevent="submitForm(form)" :validated="isvalidated" ref="form">
            <b-form-group
              label-cols="3"
              label-cols-lg="4"
              label-size="sm"
              label="username:"
              label-for="input-username"
            >
              <b-form-input
                id="input-1"
                v-model="form.username"
                required
                placeholder="Enter username"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols="3"
              label-cols-lg="4"
              label="password:"
              label-for="input-password"
            >
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>
            <b-button
              type="submit"
              variant="primary"
              class="submit_btn"
              @click.prevent="submitForm(form)"
            >Submit</b-button>
          </b-form>
        </div>

        <p class="tip">温馨提示：</p>
        <p class="tip">未登录过的新用户，自动注册</p>
        <p class="tip">注册过的用户可凭账号密码登录</p>
      </section>
    </transition>
  </div>
</template>

<script>
import { login, getAdminInfo } from "@/api/getData";
import { mapActions, mapState } from "vuex";
import Pubsub from "pubsub-js";
export default {
  data() {
    return {
      isvalidated: true,
      form: {
        username: "",
        password: ""
      },
      showLogin: false
    };
  },
  mounted() {
    this.showLogin = true;
    if (!this.adminInfo.id) {
      this.getAdminData();
    }
  },
  computed: {
    ...mapState(["adminInfo"])
  },
  methods: {
    ...mapActions(["getAdminData"]),

    //点击登陆方法
    async submitForm(form) {     //  form  传form对象拿到username,password
     console.log(form)
      if (this.isvalidated) {
        const res = await login({    //传一个data对象  
          user_name: form.username,
          password: form.password
        });
    console.log(res)//拿到请求的值
        if (res.status == 1) {
          this.$router.push({
            name: "manage",
            params: {
              username:'manage'
            }
          });
          Pubsub.publish("isseccess", res);
        } else {
          this.$bvToast.toast(res.message, {
            title: "错误提示",
            autoHideDelay: 3000,
            variant: "danger",
            toaster: "b-toaster-top-center"
          });
        }
      }
    }


  }
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.login_page {
  background-color: #324057;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  .wh(420px, 310px);
  .ctp(420px, 310px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
.tip {
  font-size: 12px;
  color: red;
  margin-top: 20px;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>

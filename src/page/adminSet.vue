<template>
  <div class="fillcontain">
    <head-top></head-top>
    <header class="admin_title">管理员信息</header>
    <div class="admin_set">
      <ul>
        <li>
          <span>姓名：</span>
          <span>{{adminInfo.user_name}}</span>
        </li>
        <li>
          <span>注册时间：</span>
          <span>{{adminInfo.create_time}}</span>
        </li>
        <li>
          <span>管理员权限：</span>
          <span>{{adminInfo.admin}}</span>
        </li>
        <li>
          <span>管理员 ID：</span>
          <span>{{adminInfo.id}}</span>
        </li>
        <li>
          <div>更换头像</div>
          <div class="ml-5 pl-5 mb-2">
            <b-img
              left
              width="150"
              height="150"
              :src="baseImgPath + adminInfo.avatar"
              fluid
              alt="Fluid image"
              class="mb-3"
            ></b-img>
            <b-form-file
              v-model="file"
              plain
              @input="pushimape_pathadmin(file)"
              accept="image/jpeg, image/png, image/gif"
            ></b-form-file>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { mapState } from "vuex";
import { baseUrl, baseImgPath } from "@/config/env";
import touploadfile from "@/config/uploadfile";

export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      image_path: "",
      file: ""
    };
  },
  components: {
    headTop
  },
  computed: {
    ...mapState(["adminInfo"])
  },
  mounted() {
    console.log(this.adminInfo);
  },
  methods: {
    async pushimape_pathadmin(file) {
      if (file) {
        var adminisLt3M = file.size / 1024 / 1024 < 3;
      }
      //验证图片大小
      if (adminisLt3M) {
        const get_address_path = await touploadfile(
          `admin/update/avatar/${this.adminInfo.id}`,
          file
        );
        const GAPparse = JSON.parse(get_address_path);
        if (GAPparse.status === 1) {
          this.$bvToast.toast("上传成功", {
            title: "成功提示",
            toaster: "b-toaster-top-center",
            autoHideDelay: 2000,
            variant: "success"
          });
          this.adminInfo.avatar = GAPparse.image_path;
          console.log(GAPparse);
        } else {
          this.$bvToast.toast("上传失败，请重新上传", {
            title: "错误提示",
            autoHideDelay: 2000,
            variant: "danger",
            toaster: "b-toaster-top-center"
          });
        }
      } else {
        this.$bvToast.toast("上传图片超过3M，请重新上传", {
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
.explain_text {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
}
.admin_set {
  width: 60%;
  background-color: #f9fafc;
  min-height: 400px;
  margin: 20px auto 0;
  border-radius: 10px;
  ul > li {
    padding: 20px;
    span {
      color: #666;
    }
  }
}
.admin_title {
  margin-top: 20px;
  .sc(24px, #666);
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  margin-top: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>

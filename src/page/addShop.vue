<template>
  <b-row class="justify-content-md-center">
    <b-col cols="7" class="mt-5 text-center">
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-1"
          label="店铺名称"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            required
            placeholder="请输入店铺名称"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-2"
          label="详细地址"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            placeholder="请输入地方名称"
            v-model="form.address"
            autocomplete="off"
            @click="showaddress1"
            @input="getaddress(form.address)"
          ></b-form-input>

          <b-list-group-item
            button
            @click="pushaddress(item)"
            v-for="(item,index) in address"
            :key="index"
            v-show="isShowaddress"
          >{{item}}</b-list-group-item>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-3"
          label="联系电话"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.phone"
            required
            placeholder="请输入联系电话"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-4"
          label="店铺简介"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="form.description"
            required
            placeholder="请输入店铺简介"
            
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-5"
          label="店铺标语"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            v-model="form.promotion_info"
            required
            placeholder="请输入店铺标语"
            
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-6"
          label="店铺分类"
          label-for="input-6"
        >
          <selece2 id="input-5" v-on:getfoods="getfoodsfun" :form="form" :category="category"></selece2>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-7"
          label="店铺特点"
          label-for="input-7"
        >
          <b-row>
            <b-col>
              <span>品牌保证</span>
              <b-form-checkbox v-model="form.is_premium" name="check-button" switch></b-form-checkbox>
            </b-col>
            <b-col>
              <span>蜂鸟专送</span>
              <b-form-checkbox v-model="form.delivery_mode" name="check-button" switch></b-form-checkbox>
            </b-col>
            <b-col>
              <span>新开店铺</span>
              <b-form-checkbox v-model="form.new" name="check-button" switch></b-form-checkbox>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <span>外卖保</span>
              <b-form-checkbox v-model="form.bao" name="check-button" switch></b-form-checkbox>
            </b-col>
            <b-col>
              <span>准时达</span>
              <b-form-checkbox v-model="form.zhun" name="check-button" switch></b-form-checkbox>
            </b-col>
            <b-col>
              <span>开发票</span>
              <b-form-checkbox v-model="form.piao" name="check-button" switch></b-form-checkbox>
            </b-col>
          </b-row>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-8"
          label="配送费"
          label-for="input-8"
        >
          <div class="mt-2">{{ form.float_delivery_fee }}</div>
          <b-form-input
            id="input-8"
            v-model="form.float_delivery_fee"
            required
            
            type="range"
            min="0"
            max="20"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-9"
          label="起送价"
          label-for="input-9"
        >
          <div class="mt-2">{{ form.float_minimum_order_amount }}</div>
          <b-form-input
            id="input-9"
            v-model="form.float_minimum_order_amount"
            required
            
            type="range"
            min="0"
            max="40"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-10"
          label="营业时间"
          label-for="input-10"
        >
          <b-row>
            <b-col>
              <span>起始时间</span>
              <b-form-input
                id="input-10"
                v-model="form.startTime"
                required
                
                type="time"
                placeholder="起始时间"
              ></b-form-input>
            </b-col>
            <b-col>
              <span>结束时间</span>
              <b-form-input
                id="input-10"
                v-model="form.endTime"
                required
                
                type="time"
                placeholder="结束时间"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-11"
          label="上传店铺头像"
          label-for="input-11"
        >
          <b-img
            v-if="form.image_path"
            left
            width="200"
            height="200"
            :src="baseImgPath + form.image_path"
            fluid
            alt="Fluid image"
            class="mb-3"
          ></b-img>
          <b-spinner class="mt-5 mb-5 left ml-5" v-else label="Spinning"></b-spinner>
          <b-form-file
            id="input-11"
            v-model="file1"
            plain
            @input="pushimape_path1(file1)"
            accept="image/jpeg, image/png, image/gif"
          ></b-form-file>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-12"
          label="上传营业执照"
          label-for="input-12"
        >
          <b-img
            v-if="form.business_license_image"
            left
            width="200"
            height="200"
            :src="baseImgPath + form.business_license_image"
            fluid
            alt="Fluid image"
            class="mb-3"
          ></b-img>
          <b-spinner class="mt-5 mb-5 left ml-5" v-else label="Spinning"></b-spinner>
          <b-form-file
            id="input-12"
            v-model="file2"
            plain
            @input="pushimape_path2(file2)"
            accept="image/jpeg, image/png, image/gif"
          ></b-form-file>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-13"
          label="上传餐饮服务业许可证"
          label-for="input-13"
        >
          <b-img
            v-if="form.catering_service_license_image"
            left
            width="200"
            height="200"
            :src="baseImgPath + form.catering_service_license_image"
            fluid
            alt="Fluid image"
            class="mb-3"
          ></b-img>
          <b-spinner class="mt-5 mb-5 left ml-5" v-else label="Spinning"></b-spinner>
          <b-form-file
            id="input-13"
            v-model="file3"
            plain
            @input="pushimape_path3(file3)"
            accept="image/jpeg, image/png, image/gif"
          ></b-form-file>
        </b-form-group>

        <b-form-group
          class="mt-5 mb-5"
          label-cols="4"
          label-cols-lg="2"
          id="input-group-14"
          label="优惠活动"
          label-for="input-14"
        >
          <b-form-select
            width="200"
            @input="showmodal"
            id="input-14"
            v-model="activityValue"
            :options="options"
          ></b-form-select>
        </b-form-group>
        <b-table hover striped :fields="fields" :items="activities" ref="tableActivities">
          <!-- A custom formatted data column cell -->
          <template slot="deleteActList" slot-scope="formitem">
            <b-button @click="cliDeleteActList(formitem)" variant="danger">删除</b-button>
          </template>
        </b-table>
        <b-button type="submit" variant="primary" class="mt-5 mb-5">立即创建</b-button>
      </b-form>
      <b-modal centered id="modalactvityValue" title="提示" @ok="actdtOk">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          id="input-group-15"
          label="活动详情"
          label-for="input-15"
        >
          <b-form-input
            id="input-15"
            v-model="actvitydt"
            required
            placeholder="请输入活动详情"
            
          ></b-form-input>
        </b-form-group>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
import headTop from "@/components/headTop";
import selece2 from "@/components/selece2";
import {
  cityGuess,
  addShop,
  searchplace,
  foodCategory,
  touploadfile
} from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";
export default {
  data() {
    return {
      city: {},
      form: {
        name: "", //店铺名称
        address: "", //地址
        latitude: "",
        longitude: "",
        description: "", //介绍
        phone: "",
        promotion_info: "",
        float_delivery_fee: 5, //运费
        float_minimum_order_amount: 20, //起价
        is_premium: true,
        delivery_mode: true,
        new: true,
        bao: true,
        zhun: true,
        piao: true,
        startTime: "",
        endTime: "",
        image_path: null,
        business_license_image: null,
        catering_service_license_image: null,
        category: []
      },
      category: [],
      options: [
        { value: "满减优惠", text: "满减优惠" },
        { value: "优惠大酬宾", text: "优惠大酬宾" },
        { value: "新用户立减", text: "新用户立减" },
        { value: "进店领券", text: "进店领券" }
      ],

      activityValue: "满减优惠",
      fields: [
        { key: "icon_name", label: "活动标题" },
        { key: "name", label: "活动名称" },
        { key: "description", label: "活动详情" },
        { key: "deleteActList", label: "操作" }
      ],
      activities: [
        {
          icon_name: "减",
          name: "满减优惠",
          description: "满30减5，满60减8"
        }
      ],
      baseUrl,
      baseImgPath,
      categoryOptions: [],
      show: true,
      isShowaddress: false,
      address: "",
      file1: "",
      file2: "",
      file3: "",
      actvitydt: null
    };
  },
  components: {
    headTop,
    selece2
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        this.city = await cityGuess();
        const categories = await foodCategory();
        categories.forEach(item => {
          if (item.sub_categories.length) {
            const addnew = {
              value: item.name,
              label: item.name,
              children: []
            };
            item.sub_categories.forEach((subitem, index) => {
              if (index == 0) {
                return;
              }
              addnew.children.push({
                value: subitem.name,
                label: subitem.name
              });
            });
            this.categoryOptions.push(addnew);
          }
        });
        this.getCategory();
      } catch (err) {
        console.log(err);
      }
    },
    //获取店铺分类
    async getCategory() {
      const categories = await foodCategory();
      this.category = categories;
    },
    getfoodsfun(fooddata) {
      //自定义事件，对应sele2所需的数据
      this.form.category = fooddata;
    },

    //显示地址数据
    showaddress1() {
      this.isShowaddress = true;
    },
    //获取地址数据
    async getaddress(value) {
      this.address = [];
      if (value.length > 0) {
        const cityList = await searchplace(this.city.id, value);

        if (cityList instanceof Array) {
          let getData = cityList.map(item => item.address);
          this.address = getData;
          this.isShowaddress = true;
        }
      }
    },
    //把addree给form
    pushaddress(item) {
      this.form.address = item;
      this.isShowaddress = false;
    },

    //上传店铺头像
    async pushimape_path1(file1) {
      const isLt3M = file1.size / 1024 / 1024 < 3;
      //验证图片大小
      if (isLt3M) {
        const get_address_path = await touploadfile("shop", file1);
        const GAPparse = JSON.parse(get_address_path);
        if (GAPparse.status === 1) {
          this.$bvToast.toast("上传成功", {
            title: "成功提示",
            toaster: "b-toaster-top-center",
            autoHideDelay: 2000,
            variant: "success"
          });
          this.form.image_path = GAPparse.image_path;
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
    },

    async pushimape_path2(file2) {
      const isLt3M = file2.size / 1024 / 1024 < 3;
      //验证图片大小
      if (isLt3M) {
        const get_address_path = await touploadfile("shop", file2);
        const GAPparse = JSON.parse(get_address_path);
        if (GAPparse.status === 1) {
          this.$bvToast.toast("上传成功", {
            title: "成功提示",
            toaster: "b-toaster-top-center",
            autoHideDelay: 2000,
            variant: "success"
          });
          this.form.business_license_image = GAPparse.image_path;
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
    },
    async pushimape_path3(file3) {
      const isLt3M = file3.size / 1024 / 1024 < 3;
      //验证图片大小
      if (isLt3M) {
        const get_address_path = await touploadfile("shop", file3);
        const GAPparse = JSON.parse(get_address_path);
        if (GAPparse.status === 1) {
          this.$bvToast.toast("上传成功", {
            title: "成功提示",
            toaster: "b-toaster-top-center",
            autoHideDelay: 2000,
            variant: "success"
          });
          this.form.catering_service_license_image = GAPparse.image_path;
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
    },

    showmodal() {
      this.$bvModal.show("modalactvityValue");
    },
    actdtOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (!this.actvitydt) {
        this.$bvToast.toast("请输入活动详情", {
          title: "提示",
          autoHideDelay: 1000,
          variant: "danger",
          toaster: "b-toaster-top-center"
        });
      } else {
        let newObj = {};
        switch (this.activityValue) {
          case "满减优惠":
            newObj = {
              icon_name: "减",
              name: "满减优惠",
              description: this.actvitydt
            };
            break;
          case "优惠大酬宾":
            newObj = {
              icon_name: "特",
              name: "优惠大酬宾",
              description: this.actvitydt
            };
            break;
          case "新用户立减":
            newObj = {
              icon_name: "新",
              name: "新用户立减",
              description: this.actvitydt
            };
            break;
          case "进店领券":
            newObj = {
              icon_name: "领",
              name: "进店领券",
              description: value
            };
            break;
        }
        this.activities.push(newObj);
        this.$refs.tableActivities.refresh();

        this.$bvToast.toast("添加成功，可继续添加", {
          title: "提示",
          autoHideDelay: 1000,
          variant: "success",
          toaster: "b-toaster-top-center"
        });
      }
    },
    cliDeleteActList(formitem) {
      this.activities.splice(formitem.index, 1);
    },
    //提交
    async onSubmit() {
      if (
        this.form.image_path !== null &&
        this.form.business_license_image !== null &&
        this.form.catering_service_license_image !== null
      ) {
        Object.assign(this.formData, { activities: this.activities });

        try {
          let result = await addShop(this.form);
          if (result.status == 1) {
            this.$bvToast.toast("添加成功", {
              title: "成功提示",
              toaster: "b-toaster-top-center",
              autoHideDelay: 2000,
              variant: "success"
            });

            this.form = {
              name: "", //店铺名称
              address: "", //地址
              latitude: "",
              longitude: "",
              description: "", //介绍
              phone: "",
              promotion_info: "",
              float_delivery_fee: 5, //运费
              float_minimum_order_amount: 20, //起价
              is_premium: true,
              delivery_mode: true,
              new: true,
              bao: true,
              zhun: true,
              piao: true,
              startTime: "",
              endTime: "",
              image_path: "",
              business_license_image: "",
              catering_service_license_image: ""
            };
            this.activities = [
              {
                icon_name: "减",
                name: "满减优惠",
                description: "满30减5，满60减8"
              }
            ];
          } else {
            this.$bvToast.toast("resule.message", {
              title: "错误提示",
              toaster: "b-toaster-top-center",
              autoHideDelay: 2000,
              variant: "danger"
            });
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$bvToast.toast("请选择图片", {
          title: "错误提示",
          toaster: "b-toaster-top-center",
          autoHideDelay: 2000,
          variant: "danger"
        });
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
</style>

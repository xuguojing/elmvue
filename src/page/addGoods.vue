<template>
  <div>
    <head-top></head-top>

    <b-row class="justify-content-md-center">
      <b-col cols="7" class="mt-5 text-center">
        <b-form v-if="show" :form="categoryForm">
          <div role="tablist1">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">选择食品种类</b-card-header>

              <b-form-group
                class="mt-4 mb-4"
                label-cols="4"
                label-cols-lg="2"
                id="input-group-1"
                label="食品种类"
                label-for="input-1"
              >
                <b-form-select
                  id="input-1"
                  placeholder="请选择食品种类"
                  v-model="categoryForm.categorySelect"
                  :options="categoryForm.categoryList"
                ></b-form-select>
              </b-form-group>

              <b-collapse id="collapse-10" accordion="my-accordion" role="tabpanel">
                <b-card bg-variant="light" class="text-center">
                  <b-card-body>
                    <b-form-group
                      label-cols="4"
                      label-cols-lg="2"
                      id="input-group-2"
                      label="食品种类"
                      label-for="input-2"
                    >
                      <b-form-input
                        id="input-2"
                        v-model="categoryForm.name"
                        required
                        placeholder="请输入食品种类"
                        autocomplete="off"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label-cols="4"
                      label-cols-lg="2"
                      id="input-group-3"
                      label="种类描述"
                      label-for="input-3"
                    >
                      <b-form-input
                        id="input-3"
                        v-model="categoryForm.description"
                        placeholder="请输入种类描述"
                      ></b-form-input>
                    </b-form-group>

                    <b-button
                      @click.prevent="submitcategoryForm('categoryForm')"
                      type="submit"
                      variant="primary"
                      class="mt-3"
                    >提交</b-button>
                  </b-card-body>
                </b-card>
              </b-collapse>
              <b-button block button v-b-toggle.collapse-10 variant="light">添加食品种类</b-button>
            </b-card>
          </div>

          <!-- <b-button type="submit" variant="primary">Submit</b-button> -->
        </b-form>

        <b-form @submit.prevent="addFood('foodForm')" v-if="show" :form="foodForm" class="mt-5">
          <div role="tablist2" class="mb-4">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">添加食品</b-card-header>

              <b-form-group
                class="mt-4"
                label-cols="4"
                label-cols-lg="2"
                id="input-group-1"
                label="食品名称"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="foodForm.name"
                  required
                  placeholder="请输入食品名称"
                  autocomplete="off"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols="4"
                label-cols-lg="2"
                id="input-group-2"
                label="食品活动"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="foodForm.activity"
                  required
                  placeholder="请输入食品活动"
                  autocomplete="off"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols="4"
                label-cols-lg="2"
                id="input-group-3"
                label="食品详情"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="foodForm.description"
                  placeholder="请输入食品详情"
                  autocomplete="off"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols="4"
                label-cols-lg="2"
                id="input-group-11"
                label="上传食品图片"
                label-for="input-11"
              >
                <b-img
                  v-if="foodForm.image_path"
                  left
                  width="200"
                  height="200"
                  :src="baseImgPath + foodForm.image_path"
                  fluid
                  alt="Fluid image"
                  class="mb-3"
                ></b-img>
                <b-spinner class="mt-5 mb-5 left ml-5" v-else label="Spinning"></b-spinner>
                <b-form-file
                  id="input-11"
                  v-model="file"
                  plain
                  @input="pushimape_path(file)"
                  accept="image/jpeg, image/png, image/gif"
                ></b-form-file>
              </b-form-group>

              <b-form-group
                label-cols="4"
                label-cols-lg="2"
                id="input-group-11"
                label="食品特点"
                label-for="input-11"
              >
                <b-row class="justify-content-md-center">
                  <h3 class="mr-5">
                    <b-badge href="#" variant="primary">{{foodForm.attributes[0]}}</b-badge>
                  </h3>
                  <h3>
                    <b-badge href="#" variant="primary">{{foodForm.attributes[1]}}</b-badge>
                  </h3>
                </b-row>

                <b-form-select
                  v-model="foodForm.attributes"
                  :options="selectattributes"
                  :select-size="2"
                  multiple
                ></b-form-select>
              </b-form-group>

              <b-form-group
                label-cols="4"
                label-cols-lg="2"
                id="input-group-11"
                label="食品特点"
                label-for="input-11"
              >
                <b-form-radio v-model="foodSpecs" name="some-radios" value="one">单规格</b-form-radio>
                <b-form-radio v-model="foodSpecs" name="some-radios" value="more">多规格</b-form-radio>
              </b-form-group>
              <div v-if="foodSpecs=='one'">
                <b-form-group
                  label-cols="4"
                  label-cols-lg="2"
                  id="input-group-8"
                  label="配送费"
                  label-for="input-8"
                >
                  <div class="mt-2">{{ foodForm.specs[0].packing_fee}}</div>
                  <b-form-input
                    id="input-8"
                    v-model="foodForm.specs[0].packing_fee"
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
                  <div class="mt-2">{{ foodForm.specs[0].price }}</div>
                  <b-form-input
                    id="input-9"
                    v-model="foodForm.specs[0].price"
                    required
                    type="range"
                    min="0"
                    max="40"
                  ></b-form-input>
                </b-form-group>
              </div>

              <div v-else>
                <b-form-group id="input-group-5" label-for="input-5">
                  <b-table :items="specs" :fields="fields1" responsive="sm" ref="table">
                    <template slot="Operation" slot-scope="row1">
                      <b-button
                        @click="deleteSpecs(row1.index)"
                        size="sm"
                        variant="danger"
                        class="mr-2"
                      >删除</b-button>
                    </template>
                  </b-table>

                  <b-button @click="$bvModal.show('modalmulti6')" class="mr-2">添加规格</b-button>

                  <!-- 规格模态框 -->
                  <b-modal id="modalmulti6" title="添加规格" centered @ok="OKmodalmulti3">
                    <b-form :form="specsForm">
                      <b-form-group
                        id="fieldset-1"
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="规格"
                        label-for="input-1"
                        :state="state"
                        :invalid-feedback="invalidFeedback"
                      >
                        <b-form-input id="input-1" v-model="specsForm.specs" :state="state" trim></b-form-input>
                      </b-form-group>

                      <b-form-group
                        id="fieldset-1"
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="包装费"
                        label-for="input-1"
                        :state="state1"
                        :invalid-feedback="invalidFeedback1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="specsForm.packing_fee"
                          :state="state1"
                          trim
                          type="number"
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group
                        id="fieldset-1"
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="价格"
                        label-for="input-1"
                        :state="state2"
                        :invalid-feedback="invalidFeedback2"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="specsForm.price"
                          :state="state2"
                          trim
                          type="number"
                        ></b-form-input>
                      </b-form-group>
                    </b-form>
                  </b-modal>
                </b-form-group>
              </div>
            </b-card>
          </div>

          <b-button type="submit" variant="primary">确认添加食品</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { getCategory, addCategory, addFood, touploadfile } from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";
export default {
  data() {
    return {
      categorySelectindex: 0,
      baseUrl,
      baseImgPath,
      show: true,
      restaurant_id: "",
      categoryForm: {
        categoryList: [],
        categorySelect: "",
        name: "",
        description: "",
        restaurant_id: ""
      },
      foodForm: {
        name: "",
        description: "",
        image_path: "",
        activity: "",
        attributes: [],
        specs: [
          {
            specs: "默认",
            packing_fee: 0,
            price: 20
          }
        ]
      },
      file: null,
      selectattributes: [
        { value: "新品", text: "新品" },
        { value: "招牌", text: "招牌" }
      ],
      fields1: ["specs", "packing_fee", "price", "Operation"],
      foodSpecs: "one",

      specs: [
        {
          specs: "默认",
          packing_fee: 0,
          price: 20
        }
      ],
      specsFormVisible: false, // 二级模态框
      name: "",
      specsForm: {
        specs: "",
        packing_fee: 0,
        price: 0
      },
      form11: {},
      resultcategory_list: ""
    };
  },
  components: {
    headTop
  },
  created() {
    if (this.$route.query.restaurant_id) {
      this.restaurant_id = this.$route.query.restaurant_id;
    } else {
      this.$bvToast.toast("请先选择商铺,否则无法正常添加", {
        title: "错误提示",
        toaster: "b-toaster-top-center",
        autoHideDelay: 20000,
        variant: "danger",
        to: "/shopList"
      });
      this.$bvModal.show("showTomodalFoodlist");
    }
    this.initData();
  },
  computed: {
    state() {
      return this.specsForm.specs.length >= 1 > 0 ? true : false;
    },
    invalidFeedback() {
      if (this.specsForm.specs.length > 1) {
        return "";
      } else {
        return "请出入规格";
      }
    },
    state1() {
      return this.specsForm.packing_fee ? true : false;
    },
    invalidFeedback1() {
      if (this.specsForm.packing_fee > 0) {
        return "";
      } else {
        return "不能小于0";
      }
    },
    state2() {
      return this.specsForm.price ? true : false;
    },
    invalidFeedback2() {
      if (this.specsForm.price > 0) {
        return "";
      } else {
        return "不能小于0";
      }
    }
  },
  methods: {
    async initData() {
      try {
        const result = await getCategory(this.$route.query.restaurant_id);
        console.log(result);
        if (result.status == 1) {
          result.category_list.map((item, index) => {
            item.value = item.id;
            item.label = item.name;
          });

          const category_list_value = [...result.category_list];

          const category_list_value_list = category_list_value.map(item => ({
            value: item.value,
            text: item.label
          }));

          this.categoryForm.categoryList = category_list_value_list;
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    },
    //提交添加食品种类
    async submitcategoryForm() {
      //创建一个对象 把所需的数据 赋值

      try {
        const params = {
          name: this.categoryForm.name,
          description: this.categoryForm.description,
          restaurant_id: this.restaurant_id
        };
        const result = await addCategory(params);

        if (result.status == 1) {
          this.$bvToast.toast("成功", {
            title: "成功提示",
            toaster: "b-toaster-top-center",
            autoHideDelay: 2000,
            variant: "success"
          });
          this.initData();
          this.categoryForm.name = "";
          this.categoryForm.description = "";
        } else {
          throw result.message;
        }
        //if    status  ==1
        //重新初始化 获取数据
        //然后  初始化值
        //提示成功
      } catch (err) {
        //提交失败
        this.$bvToast.toast(err, {
          title: "错误提示",
          toaster: "b-toaster-top-center",
          autoHideDelay: 2000,
          variant: "danger"
        });
      }
    },

    async pushimape_path(file1) {
      const isLt3M = file1.size / 1024 / 1024 < 3;
      //验证图片大小
      if (isLt3M) {
        const get_address_path = await touploadfile("food", file1);
        const GAPparse = JSON.parse(get_address_path);
        if (GAPparse.status === 1) {
          this.$bvToast.toast("上传成功", {
            title: "成功提示",
            toaster: "b-toaster-top-center",
            autoHideDelay: 2000,
            variant: "success"
          });
          this.foodForm.image_path = GAPparse.image_path;
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
    OKmodalmulti3() {
      if (
        this.specsForm.specs &&
        this.specsForm.packing_fee > 0 &&
        this.specsForm.price > 0
      ) {
        //push specsForm给specs
        this.form11 = this.specsForm;
        this.specs.push(this.form11);
        (this.specsForm = {
          specs: "",
          packing_fee: 0,
          price: 0
        }),
          //强制更新table
          this.$refs.table.refresh();
      } else {
        this.$bvToast.toast("请输入合理数据", {
          title: "错误提示",
          autoHideDelay: 2000,
          variant: "danger",
          toaster: "b-toaster-top-center"
        });
      }
    },
    deleteSpecs(index) {
      this.specs.splice(index, 1);
      this.$refs.table.refresh();
    },

    async addFood() {
      try {
        const params = {
          ...this.foodForm,
          category_id: this.categoryForm.categorySelect,
          restaurant_id: this.$route.query.restaurant_id
        };

        const result = await addFood(params);

        if (result.status == 1) {
          //提示成功
          this.$bvToast.toast(result.success, {
            title: "成功提示",
            autoHideDelay: 2000,
            variant: "success",
            toaster: "b-toaster-top-center"
          });

          this.foodForm = {
            name: "",
            description: "",
            image_path: "",
            activity: "",
            attributes: [],
            specs: [
              {
                specs: "默认",
                packing_fee: 0,
                price: 20
              }
            ]
          };
        } else {
          //提示失败
          this.$bvToast.toast(result.message, {
            title: "错误提示",
            autoHideDelay: 2000,
            variant: "danger",
            toaster: "b-toaster-top-center"
          });
        }
      } catch (err) {
        this.$bvToast.toast("提交错误信息,添加失败", {
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
</style>

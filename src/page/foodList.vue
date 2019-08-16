<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="overflow-auto">
      <!-- table -->
      <b-table
        ref="updetable"
        v-if="items.length"
        :items="items"
        :fields="fields"
        hover
        responsive="sm"
        class="text-sm-center"
        userId="my-table"
        :per-page="perPage"
      >
        <!-- 插槽1 操作 -->
        <template slot="Operation" slot-scope="row">
          <b-button
            size="sm"
            @click="showdetail(row)"
            class="mr-2"
          >{{ row.detailsShowing ? '显示' : '隐藏'}} 详细信息</b-button>

          <b-button @click="showmodal1(row)" size="sm" class="mr-2">编辑</b-button>

          <b-button @click="handleDelete(row)" variant="danger" size="sm" class="mr-2">删除</b-button>
        </template>

        <!--插槽2 下拉详细信息 -->
        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row class="mb-2">
              <b-col cols="2" class="text-sm-right">
                <b>食品名称:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.name }}</b-col>
              <b-col cols="4" class="text-sm-right">
                <b>餐馆名称:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.restaurant_name }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col cols="2" class="text-sm-right">
                <b>食品 ID:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.item_id}}</b-col>
              <b-col cols="4" class="text-sm-right">
                <b>餐馆 ID:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.restaurant_id}}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="2" class="text-sm-right">
                <b>食品介绍:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.description }}</b-col>
              <b-col cols="4" class="text-sm-right">
                <b>餐馆地址:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.restaurant_address }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="2" class="text-sm-right">
                <b>食品评分:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.rating }}</b-col>
              <b-col cols="4" class="text-sm-right">
                <b>食品分类:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.category_name}}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="2" class="text-sm-right">
                <b>月销量:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.month_sales }}</b-col>
            </b-row>
            <b-row>
              <b-col class="text-sm-center">
                <b-button size="sm" @click="row.toggleDetails">隐藏 详细信息</b-button>
              </b-col>
            </b-row>
          </b-card>
        </template>
      </b-table>
      <!-- loading -->
      <b-row v-else class="text-center">
        <b-col>
          <b-spinner
            class="mt-5 mb-5"
            style="width:6rem; height: 6rem;"
            type="grow"
            label="Loading..."
            variant="secondary"
          ></b-spinner>
        </b-col>
      </b-row>
      {{`共${this.count}条`}}
      <!-- 分页 -->
      <b-pagination
        number-of-pages
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        align="left"
      ></b-pagination>

      <!-- 模态框 -->
      <b-modal id="bv-modal-example1" hide-footer>
        <template slot="modal-title">修改食品信息</template>

        <div class="d-block text-center">
          <!-- 表单内容 -->
          <b-form @submit="onSubmit" v-if="show">
            <b-form-group
              label-cols="4"
              label-cols-lg="2"
              id="input-group-1"
              label="食物名称"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.name"
                required
                placeholder="请输入食物名称"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="4"
              label-cols-lg="2"
              id="input-group-2"
              label="食品介绍"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.description"
                required
                placeholder="请输入食品介绍"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="4"
              label-cols-lg="2"
              id="input-group-3"
              label="食品分类"
              label-for="input-3"
            >
              <b-form-select
                id="input-3"
                required
                placeholder="请选择分类"
                v-model.lazy="form.category_name"
                :options="menuOptions"
              ></b-form-select>
            </b-form-group>

            <b-form-group
              label-cols="4"
              label-cols-lg="2"
              id="input-group-4"
              label="食品图片"
              label-for="input-4"
            >
              <b-img
                left
                width="200"
                height="200"
                :src="baseImgPath + form.image_path"
                fluid
                alt="Fluid image"
                class="mb-3"
              ></b-img>
              <b-form-file
                id="input-4"
                v-model="file"
                plain
                @input="pushimape_path(file)"
                accept="image/jpeg, image/png, image/gif"
              ></b-form-file>
            </b-form-group>



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

              <b-button @click="$bvModal.show('modalmulti2')" class="mr-2">添加规格</b-button>

              <!-- 规格模态框 -->
              <b-modal id="modalmulti2" title="添加规格" centered @ok="OKmodalmulti2">
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

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button @click="hidemodal" variant="primary">取消</b-button>
          </b-form>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  getFoods,
  getFoodsCount,
  getMenu,
  updateFood,
  deleteFood,
  getResturantDetail,
  getMenuById,
  touploadfile
} from "@/api/getData";

export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      restaurant_id: null,
      fields: ["name", "description", "rating", "Operation"],
      fields1: ["specs", "packing_fee", "price", "Operation"],
      items: [], //列表数据 row
      city: {}, //初始化城市经纬度
      offset: 0, //初始化推移n条数据
      limit: 10, //初始化请求n条数据
      count: 0, //初始化总数量
      currentPage: 1, //当前页数  因为BTvue动态改变currentPage 所以不需要写方法
      perPage: 10, //一页10条数据
      selectMenu: {},
      menuOptions: [],
      show: true,
      form: {
        name: "", //食品名称
        category_name: "", //分类名称
        description: "",
        image_path: ""
      },
      image_path: "",
      file: "",
      specsFormVisible: false, // 二级模态框
      name: "",
      specsForm: {
        specs: "",
        packing_fee: 0,
        price: 0
      },
			form22:''
    };
  },
  created() {
    this.restaurant_id = this.$route.query.restaurant_id;
    this.initData();
  },
  computed: {
    rows() {
      return this.count;
    },
    specs: function() {
      let specs = [];
      if (this.form.specfoods) {
        this.form.specfoods.forEach(item => {
          specs.push({
            specs: item.specs_name,
            packing_fee: item.packing_fee,
            price: item.price
          });0
        });
      }
      return specs;
    },

    //规格验证
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

    //规格验证结束
  },
  methods: {
    async initData() {
      try {
        const countData = await getFoodsCount({
          restaurant_id: this.restaurant_id
        });
        if (countData.status == 1) {
          this.count = countData.count;
        } else {
          throw new Error("获取数据失败");
        }
        this.getFoods();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    //获取食物列表
    async getFoods() {
      const Foods = await getFoods({
        offset: this.offset,
        limit: this.limit,
        restaurant_id: this.restaurant_id
      });
      this.items = [];
      Foods.forEach((item, index) => {
        const tableData = {};
        tableData.name = item.name;
        tableData.item_id = item.item_id;
        tableData.description = item.description;
        tableData.rating = item.rating;
        tableData.month_sales = item.month_sales;
        tableData.restaurant_id = item.restaurant_id;
        tableData.category_id = item.category_id;
        tableData.image_path = item.image_path;
        tableData.specfoods = item.specfoods;
        tableData.index = index;
        this.items.push(tableData);
      });
    },

    showdetail(row) {
      row.toggleDetails();

      if (row) {
        Promise.all([
          getResturantDetail(row.item.restaurant_id),
          getMenuById(row.item.category_id)
        ])
          .then(result => {
            const restaurant = result[0];
            const category = result[1];
            this.selectTable = {
              ...row.item,
              ...{
                restaurant_name: restaurant.name,
                restaurant_address: restaurant.address,
                category_name: category.name
              }
            };
            this.selectMenu = { label: category.name, value: row.category_id };
            this.items.splice(row.index, 1, { ...this.selectTable });
          })
          .catch(error => {
            this.$bvToast.toast("数据获取失败", {
              title: "错误提示",
              autoHideDelay: 2000,
              variant: "danger",
              toaster: "b-toaster-top-center"
            });
          });
      }
    },

    showmodal1(row) {
      this.form = [];
      this.$bvModal.show("bv-modal-example1");
      this.getSelectItemData(row);
    },
    hidemodal() {
      this.$bvModal.hide("bv-modal-example1");
    },

    //点击提交

    //上传图片
    async pushimape_path(file) {
      if (file) {
        var foodisLt3M = file.size / 1024 / 1024 < 3;
      }

      //验证图片大小
      if (foodisLt3M) {
        const get_address_path = await touploadfile("food", file);
        const GAPparse = JSON.parse(get_address_path);
        if (GAPparse.status === 1) {
          this.$bvToast.toast("上传成功", {
            title: "成功提示",
            toaster: "b-toaster-top-center",
            autoHideDelay: 2000,
            variant: "success"
          });
          this.image_path = GAPparse.image_path;
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

    //获取选择数据
    async getSelectItemData(row) {
      try {
        const restaurant = await getResturantDetail(row.item.restaurant_id);
        const category = await getMenuById(row.item.category_id);

        if (restaurant && category) {
          this.form = {
            ...row.item,
            ...{
              restaurant_name: restaurant.name,
              restaurant_address: restaurant.address,
              category_name: category.name
            }
          };
          this.getMenu();
          this.selectMenu = {
            label: category.name,
            value: row.item.category_id
          };
          this.items.splice(row.index, 1, { ...this.form });
        } else {
          throw new Error("获取数据失败");
        }
      } catch (err) {
        this.$bvToast.toast("获取数据失败", {
          title: "错误提示",
          autoHideDelay: 2000,
          variant: "danger",
          toaster: "b-toaster-top-center"
        });
      }
    },

    //获取菜单种类
    async getMenu() {
      this.menuOptions = [];
      try {
        const menu = await getMenu({
          restaurant_id: this.form.restaurant_id,
          allMenu: true
        });
        menu.forEach(item => {
          this.menuOptions.push(item.name);
        });
      } catch (err) {
        this.$bvToast.toast("获取数据失败", {
          title: "错误提示",
          autoHideDelay: 2000,
          variant: "danger",
          toaster: "b-toaster-top-center"
        });
      }
    },
    //删除模态框中规格信息
    deleteSpecs(index) {
      this.specs.splice(index, 1);
      this.$refs.table.refresh();
    },
    //按钮模态框2  OK按钮
    OKmodalmulti2() {
      //验证       规格为true   包装费>0  则提交  else  提示  请输入合理数据
      if (
        this.specsForm.specs &&
        this.specsForm.packing_fee > 0 &&
        this.specsForm.price > 0
      ) {
        //push specsForm给specs
				this.form22 = this.specsForm;
		this.specs.push(this.form22);
      this.specsForm = {
        specs: "",
        packing_fee: 0,
        price: 0
	  },
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
    //模态1提交
    async onSubmit() {
      try {
        const subData = {
          new_category_id: this.selectMenu.value,
          specs: this.specs
        };
        const postData = { ...this.form, ...subData }; //更新食品所需的数据
        const res = await updateFood(postData);
        if (res.status == 1) {
          this.getFoods();
          this.$bvToast.toast(res.success, {
            title: "成功提示",
            autoHideDelay: 2000,
            variant: "success",
            toaster: "b-toaster-top-center"
          });
          this.$bvModal.hide("bv-modal-example1");
          console.log("成功提示");
        } else {
          console.log("错误提示");
          this.$bvModal.hide("bv-modal-example1");
          this.$bvToast.toast("更新餐馆信息失败", {
            title: "错误提示",
            autoHideDelay: 2000,
            variant: "danger",
            toaster: "b-toaster-top-center"
          });
        }
      } catch (err) {
        this.$bvToast.toast("更新餐馆信息失败", {
          title: "错误提示",
          autoHideDelay: 2000,
          variant: "danger",
          toaster: "b-toaster-top-center"
        });
        console.log("更新餐馆信息失败", err);
        this.$bvModal.hide("bv-modal-example1");
      }
    },
    //列表删除按钮
    async handleDelete(row) {
      console.log(row);
      // this.$refs.updetable.refresh(); 强制更新table
      try {
        const res = await deleteFood(row.item.item_id);
        if (res.status == 1) {
          this.$bvToast.toast(res.message, {
            title: "成功提示",
            autoHideDelay: 2000,
            variant: "success",
            toaster: "b-toaster-top-center"
          });
          this.item.splice(index, 1);
          this.$refs.updetable.refresh();
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        this.$bvToast.toast(err.message, {
          title: "错误提示",
          autoHideDelay: 2000,
          variant: "danger",
          toaster: "b-toaster-top-center"
        });

        console.log("删除食品失败");
      }
    }
  },
  components: {
    headTop
  },
  watch: {
    //根据当前页面 改变  offset、count        继续获取用户列表
    currentPage() {
      this.offset = (this.currentPage - 1) * this.limit;
      this.items = [];
      this.getFoods();
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
</style>

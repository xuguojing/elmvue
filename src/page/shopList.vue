<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="overflow-auto">
      <!-- table -->
      <b-table
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
            @click="row.toggleDetails"
            class="mr-2"
          >{{ row.detailsShowing ? '显示' : '隐藏'}} 详细信息</b-button>

          <!-- 点击按钮showmodal显示模态框 -->
          <b-button size="sm" class="mr-2" @click="showmodal(row)">编辑</b-button>
          <!-- 开关对应
         $bvModal.show("bv-modal-example")
         $bvModal.hide('bv-modal-example')
          -->

          <b-button @click="addFood(row)" size="sm" class="mr-2">添加食品</b-button>

          <b-button @click="handleDelete(row)" variant="danger" size="sm" class="mr-2">删除</b-button>
        </template>

        <!--插槽2 下拉详细信息    slot-scope   row.item 代表当前行对应的值-->
        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row class="mb-2">
              <b-col cols="2" class="text-sm-right">
                <b>店铺名称:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.name }}</b-col>
              <b-col cols="4" class="text-sm-right">
                <b>店铺地址:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.address }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="2" class="text-sm-right">
                <b>店铺介绍:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.description}}</b-col>
              <b-col cols="4" class="text-sm-right">
                <b>店铺 ID:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.id}}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="2" class="text-sm-right">
                <b>联系电话:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.phone }}</b-col>
              <b-col cols="4" class="text-sm-right">
                <b>评分:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.rating }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="2" class="text-sm-right">
                <b>销售量:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.recent_order_num }}</b-col>
              <b-col cols="4" class="text-sm-right">
                <b>分类:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.category}}</b-col>
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

      <!-- 显示模态框 -->
      <b-modal id="bv-modal-example" hide-footer>
        <template slot="modal-title">修改店铺信息</template>

        <div class="d-block text-center">
          <!-- 表单内容 -->
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
                @blur="blur(form.address)"
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
              label="店铺介绍"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="form.description"
                required
                placeholder="请输入店铺介绍"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols="4"
              label-cols-lg="2"
              id="input-group-4"
              label="店铺电话"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                v-model="form.phone"
                required
                placeholder="请输入店铺电话"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="4"
              label-cols-lg="2"
              id="input-group-5"
              label="店铺分类"
              label-for="input-5"
            >
              <selece2 id="input-5" v-on:getfoods="getfoodsfun" :form="form" :category="category"></selece2>
            </b-form-group>

            <b-form-group
              label-cols="4"
              label-cols-lg="2"
              id="input-group-6"
              label="店铺图片"
              label-for="input-6"
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
                id="input-6"
                v-model="file"
                plain
                @input="pushimape_path(file)"
                accept="image/jpeg, image/png, image/gif"
              ></b-form-file>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button @click="hidemodal" variant="primary">取消</b-button>
          </b-form>
        </div>
      </b-modal>
      <!-- 取消隐藏模态框 -->
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import selece2 from "../components/selece2";
import { baseUrl, baseImgPath } from "@/config/env"; //目的为了拿店铺图片
import {
  cityGuess,
  getResturants,
  getResturantsCount,
  foodCategory,
  updateResturant,
  searchplace,
  deleteResturant,
  touploadfile
} from "@/api/getData";
export default {
  data() {
    return {
      baseUrl, //初始化Url
      baseImgPath, //初始化baseImgPath
      fields: ["name", "address", "description", "Operation"], //表头显示帅选后的数据
      items: [], //初始化 table data
      city: {}, //初始化城市经纬度
      offset: 0, //初始化推移n条数据
      limit: 10, //初始化请求n条数据
      count: 0, //初始化总数量
      currentPage: 1, //当前页数  因为BTvue动态改变currentPage 所以不需要写方法
      perPage: 10, //一页10条数据

      //模态框数据，所需的值有  address 数组   form  用 Object.assign() 方法  category 请求获取到
      address: [], //地址信息
      file: "",
      form: {
        //表单信息
        name: "",
        address: "",
        description: "",
        category: [],
        phone: "",
        image_path: ""
      },
      //店铺分类信息
      category: [],
      isShowaddress: false,
      image_path: "",
      show: true //模态框数据末尾
    };
  },
  created() {
    this.initData(); //初始化数据
  },
  computed: {
    rows() {
      return this.count;
    }
  },
  methods: {
    //初始化city,countData,获取店铺数据
    async initData() {
      try {
        this.city = await cityGuess();
        const countData = await getResturantsCount();
        if (countData.status == 1) {
          this.count = countData.count;
        } else {
          throw new Error("获取数据失败");
        }
        this.getResturants();
        this.getCategory();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    //获取店铺分类
    async getCategory() {
      const categories = await foodCategory();
      this.category = categories;
    },
    //获取店铺数据
    async getResturants() {
      const { latitude, longitude } = this.city;
      const restaurants = await getResturants({
        latitude,
        longitude,
        offset: this.offset,
        limit: this.limit
      });
      this.items = [];
      restaurants.forEach(item => {
        const tableData = {};
        tableData.name = item.name;
        tableData.address = item.address;
        tableData.description = item.description;
        tableData.id = item.id;
        tableData.phone = item.phone;
        tableData.rating = item.rating;
        tableData.recent_order_num = item.recent_order_num;
        tableData.category = item.category;
        tableData.image_path = item.image_path;
        this.items.push(tableData);
      });
    },
    //模态框中所需方法
    showmodal(row) {
      //点击编辑 显示模态框
      Object.assign(this.form, row.item);
      this.address = [];
      this.$bvModal.show("bv-modal-example");
      this.isShowaddress = false;
    },
    hidemodal() {
      this.isShowaddress = false;
      this.$bvModal.hide("bv-modal-example");
    },
    //选完地址隐藏
    blur(address) {},
    getfoodsfun(fooddata) {
      //自定义事件，对应sele2所需的数据
      this.form.category = fooddata;
    },

    //选择图片之后激活此方法  上传图片
    async pushimape_path(file) {
      const isLt3M = file.size / 1024 / 1024 < 3;
      //验证图片大小
      if (isLt3M) {
        const get_address_path = await touploadfile("shop", file);
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

    //获取地址信息
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

    //显示地址数据
    showaddress1() {
      this.isShowaddress = true;
    },
    //把addree给form
    pushaddress(item) {
      this.form.address = item;
      this.isShowaddress = false;
    },
    //点击提交 的方法
    async onSubmit(evt) {
      evt.preventDefault();
      const res = await updateResturant(this.form);
      try {
        if (res.status == 1) {
          this.$bvToast.toast("更新店铺信息成功", {
            title: "成功提示",
            toaster: "b-toaster-top-center",
            autoHideDelay: 2000,
            variant: "success"
          });
          this.getResturants();
        } else {
          this.$bvToast.toast(res.message, {
            title: "错误提示",
            autoHideDelay: 2000,
            variant: "danger",
            toaster: "b-toaster-top-center"
          });
        }
      } catch (err) {
        console.log("更新餐馆信息失败", err);
      }

      this.$bvModal.hide("bv-modal-example");
    },

    //添加点击食品按钮
    addFood(row) {
      console.log(row);
      this.$router.push({
        path: "addGoods",
        query: { restaurant_id: row.item.id }
      });
    },
    //删除食品
   async handleDelete(row){
        try{
            const res = await deleteResturant(row.item.id);
            debugger;
            if(res.status ==1){
            this.$bvToast.toast("删除店铺成功", {
            title: "成功提示",
            toaster: "b-toaster-top-center",
            autoHideDelay: 2000,
            variant: "success"
          });
          this.items.splice(row.index,1)
            }
            else{
               throw new Error(res.message)
            }
        }catch(err){
           this.$bvToast.toast(err.message, {
            title: "错误提示",
            autoHideDelay: 2000,
             variant: "danger",
            toaster: "b-toaster-top-center"
          });
        }
    }
  },
  components: {
    headTop,
    selece2
  },
  watch: {
    //根据当前页面 改变  offset、count        继续获取用户列表
    currentPage() {
      this.offset = (this.currentPage - 1) * this.limit;
      this.items = [];
      this.getResturants();
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
</style>

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
            @click="getdetail(row)"
            class="mr-2"
          >{{ row.detailsShowing ? '显示' : '隐藏'}} 详细信息</b-button>
        </template>

        <!--插槽2 下拉详细信息 -->
        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row class="mb-2">
              <b-col cols="2" class="text-sm-right">
                <b>用户名:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.user_name }}</b-col>
              <b-col cols="4" class="text-sm-right">
                <b>店铺名称:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.restaurant_name }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="2" class="text-sm-right">
                <b>收货地址:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.address}}</b-col>
              <b-col cols="4" class="text-sm-right">
                <b>店铺 ID:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.restaurant_id}}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="2" class="text-sm-right">
                <b>店铺地址:</b>
              </b-col>
              <b-col cols="2" class="text-sm-right">{{ row.item.restaurant_address }}</b-col>
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
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  getOrderList,
  getOrderCount,
  getResturantDetail,
  getUserInfo,
  getAddressById
} from "@/api/getData";
export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      restaurant_id: null,
      fields: ["id", "total_amount", "status", "Operation"],
      items: [],
      city: {}, //初始化城市经纬度
      offset: 0, //初始化推移n条数据
      limit: 10, //初始化请求n条数据
      count: 0, //初始化总数量
      currentPage: 1, //当前页数  因为BTvue动态改变currentPage 所以不需要写方法
      perPage: 10 //一页10条数据
    };
  },
  created() {
    this.initData();
  },
  computed: {
    rows() {
      return this.count;
    }
  },
  methods: {
    async initData() {
      try {
        const countData = await getOrderCount({
          restaurant_id: this.restaurant_id
        });
        if (countData.status == 1) {
          this.count = countData.count;
        } else {
          throw new Error("获取数据失败");
        }
        this.getOrders();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },

    async getOrders() {
      const Orders = await getOrderList({
        offset: this.offset,
        limit: this.limit,
        restaurant_id: this.restaurant_id
      });
      this.items = [];
      Orders.forEach(item => {
        const tableData = {};
        Orders.forEach((item, index) => {
          const tableData = {};
          tableData.id = item.id;
          tableData.total_amount = item.total_amount;
          tableData.status = item.status_bar.title;
          tableData.user_id = item.user_id;
          tableData.restaurant_id = item.restaurant_id;
          tableData.address_id = item.address_id;
          tableData.index = index;

          this.items.push(tableData);
        });
      });
    },

    //result[0]     .name      .address         restaurant_name   restaurant_address
    //result[1]   .address                    address
    //result[2]   .username                     user_name
    getdetail(row) {
      row.toggleDetails();

      this.$nextTick(() => {
        if (row.detailsShowing == false) {
          Promise.all([
            getResturantDetail(row.item.restaurant_id),
            getUserInfo(row.item.user_id),
            getAddressById(row.item.address_id)
          ])
            .then(result => {
              const restaurant = result[0];

              const userInfo = result[1];

              const addressInfo = result[2];
              this.items.splice(row.index, 1, {
                ...row.item,
                ...{
                  restaurant_name: restaurant.name,
                  restaurant_address: restaurant.address,
                  address: addressInfo.address,
                  user_name: userInfo.username
                }
              });
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
      });
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
      this.getOrders();
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
</style>

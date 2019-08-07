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

          <b-button size="sm" class="mr-2">编辑</b-button>

          <b-button size="sm" class="mr-2">添加食品</b-button>

          <b-button variant="danger"  size="sm" class="mr-2">删除</b-button>
        </template>

        <!--插槽2 下拉详细信息 -->
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
      <b-row   v-else  class="text-center">
        <b-col> <b-spinner class="mt-5 mb-5"  style="width:6rem; height: 6rem;"  type="grow" label="Loading..."  variant='secondary' ></b-spinner></b-col>
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
  cityGuess,
  getResturants,
  getResturantsCount,
  foodCategory,
  updateResturant,
  searchplace,
  deleteResturant
} from "@/api/getData";
export default {
  data() {
    return {
      baseUrl,
      baseImgPath,

      fields: ["name", "address", "description", "Operation"],
      items: [],
      city: {},//初始化城市经纬度
      offset: 0, //初始化推移n条数据
      limit: 10, //初始化请求n条数据
      count: 0, //初始化总数量
      currentPage: 1, //当前页数  因为BTvue动态改变currentPage 所以不需要写方法
      perPage: 10 //一页10条数据
    };
  },
  created() {
    this.initData();
    console.log(11111);
  },
  computed: {
    rows() {
      return this.count;
    }
  },
  methods: {
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
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },

    async getResturants() {
      const { latitude, longitude } = this.city;
      const restaurants = await getResturants({
        latitude,
        longitude,
        offset: this.offset,
        limit: this.limit
      });
      console.log(restaurants);
      this.items = [];

      // ["店铺名称"]: "Dickerson",
      //     ["店铺地址"]: "Macdonald",
      //     ["店铺介绍"]: "abc",
      //     ["Operation"]: ""
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
      this.getResturants();
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
</style>

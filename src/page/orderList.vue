<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <div style="text-align: left;margin-top: 10px;">
        <b-table userId="my-table" striped hover :items="items" :per-page="perPage"></b-table>
        {{`共${this.count}个用户`}}
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
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { getUserList, getUserCount } from "@/api/getData";
export default {
  data() {
    return {
      //初始化数据
      items: [], //初始化数据
      offset: 0, //初始化数据
      limit: 10, //初始化数据
      count: 0, //初始化数据
      currentPage: 1, //当前页数  因为BTvue动态改变currentPage 所以不需要写方法
      perPage: 10 //一页10条数据
    };
  },
  components: {
    headTop
  },
  computed: {
    rows() {
      return this.count;
    }
  },
  created() {
    this.initData();
  },
  methods: {
    //获取用户数量把count改变
    async initData() {
      try {
        const countData = await getUserCount();
        console.log("查看countData是否获取到", countData);
        if (countData.status == 1) {
          this.count = countData.count;
          console.log(this.count);
        } else {
          throw new Error("获取数据失败");
        }
        this.getUsers();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },

    //获取用户列表
    async getUsers() {
      const Users = await getUserList({
        offset: this.offset,
        limit: this.limit
      });
      console.log(Users);
      Users.forEach(item => {
        const { items } = this;

        const tableData = {};

        tableData.userId = item.id;
        tableData.username = item.username;
        tableData.registe_time = item.registe_time;
        tableData.city = item.city;
        this.items.push(tableData);
      });
    }
  },
  watch: {
    //根据当前页面 改变  offset、count        继续获取用户列表
    currentPage() {
      this.offset = (this.currentPage - 1) * this.limit;
      this.items = [];
      this.getUsers();
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 21px;
}
</style>

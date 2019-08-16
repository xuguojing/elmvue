<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">数据统计</header>
      <b-row style="margin-bottom: 10px;">
        <b-col>
          <div class="data_list today_head">
            <span class="data_num head">当日数据：</span>
          </div>
        </b-col>
        <b-col>
          <div class="data_list">
            <span class="data_num">{{userCount}}</span> 新增用户
          </div>
        </b-col>
        <b-col>
          <div class="data_list">
            <span class="data_num">{{orderCount}}</span> 新增订单
          </div>
        </b-col>
        <b-col>
          <div class="data_list">
            <span class="data_num">{{adminCount}}</span> 新增管理员
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="data_list all_head">
            <span class="data_num head">总数据：</span>
          </div>
        </b-col>
        <b-col>
          <div class="data_list">
            <span class="data_num">{{allUserCount}}</span> 注册用户
          </div>
        </b-col>
        <b-col>
          <div class="data_list">
            <span class="data_num">{{allOrderCount}}</span> 订单
          </div>
        </b-col>
        <b-col>
          <div class="data_list">
            <span class="data_num">{{allAdminCount}}</span> 管理员
          </div>
        </b-col>
      </b-row>
    </section>
    <b-row>
      <b-col class="w-85">
        <tendency :sevenDate="sevenDate" :sevenDay="sevenDay"></tendency>
      </b-col>
    </b-row>

    <!--页面主要处理sevenDate，sevenDay，传值给组件展示出来-->
  </div>
</template>

<script>
import headTop from "../components/headTop"; //引入头部

import tendency from "../components/tendency"; //引入图标组件
import {
  userCount,
  orderCount,
  getUserCount,
  getOrderCount,
  adminDayCount,
  adminCount
} from "@/api/getData";
import dtime from "time-formater";

export default {
  data() {
    return {
      userCount: null, //初始化 值
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      sevenDay: [],
      sevenDate: [[], [], []] //二维数组
    };
  },

  components: {
    headTop,
    tendency
  },

  mounted() {
    this.initData();

    for (let i = 6; i > -1; i--) {
      const date = dtime(new Date().getTime() - 86400000 * i).format(
        "YYYY-MM-DD"
      );

      this.sevenDay.push(date);
    }

    this.getSevenData();
  },
  computed: {},
  methods: {
    async initData() {
      const today = dtime(new Date().getTime()).format("YYYY-MM-DD"); //把日期格式化为"NaN-NaN-NaN"
      console.log(today);
      Promise.all([
        //因为需要多次请求，使用promise.all可以一次性请求
        userCount(today),
        orderCount(today),
        adminDayCount(today),
        getUserCount(),
        getOrderCount(),
        adminCount()
      ])
        .then(res => {
          this.userCount = res[0].count; //当日数据
          console.log(res);
          this.orderCount = res[1].count;
          this.adminCount = res[2].count;
          this.allUserCount = res[3].count; //总数据
          this.allOrderCount = res[4].count;
          this.allAdminCount = res[5].count;
        })
        .catch(err => {
          console.log(err);
        });
    },

    async getSevenData() {
      const apiArr = [[], [], []];
      this.sevenDay.forEach(item => {
        apiArr[0].push(userCount(item));
        apiArr[1].push(orderCount(item));
        apiArr[2].push(adminDayCount(item));
      });
      
      const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]];

      Promise.all(promiseArr)
        .then(res => {
          const resArr = [[], [], []];
          res.forEach((item, index) => {
            if (item.status == 1) {
              resArr[Math.floor(index / 7)].push(item.count);
            }
                      });
          this.sevenDate = resArr;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.data_section {
  padding: 20px;
  margin-bottom: 40px;
  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 15px;
  }
  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    .data_num {
      color: #333;
      font-size: 26px;
    }
    .head {
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }
  .today_head {
    background: #ff9800;
  }
  .all_head {
    background: #20a0ff;
  }
}
.wan {
  .sc(16px, #333);
}
</style>

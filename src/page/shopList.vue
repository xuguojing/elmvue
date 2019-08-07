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

          <b-button size="sm" class="mr-2">添加食品</b-button>

          <b-button variant="danger" size="sm" class="mr-2">删除</b-button>
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
                src="https://picsum.photos/300/150/?image=41"
                fluid
                alt="Fluid image"
                class="mb-3"
              ></b-img>
              <b-form-file id="input-6" v-model="form.file" plain @input="pushimape_path(form)"></b-form-file>
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
  changeResturant,
  searchplace,
  deleteResturant
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

      form: {
        //表单信息
        name: "",
        address: "",
        description: "",
        category: [],
        phone: "",
        image_path: "",
        file: ""
      },
      //店铺分类信息
      category: [
        {
          count: 2172,
          id: 260,
          image_url: "1babf6efbfdb0ef701f19689a5529e5fjpeg",
          level: 1,
          name: "异国料理",
          sub_categories: [
            {
              count: 12,
              id: 260,
              image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
              level: 1,
              name: "全部异国料理",
              _id: "5a22showmodal7c57d4b3131b5e9f28"
            },
            {
              count: 57,
              id: 229,
              image_url: "cf8c84a2fe5ecf27b21bcbddc1724d36png",
              level: 2,
              name: "日韩料理",
              _id: "5a22showmodal7c57d4b3131b5e9f27"
            },
            {
              count: 25,
              id: 230,
              image_url: "78c45200d58e5c02cb70fb8287df732dpng",
              level: 2,
              name: "西餐",
              _id: "5a22showmodal7c57d4b3131b5e9f26"
            },
            {
              count: 5,
              id: 211,
              image_url: "bb7eb2afe778ba9afbe54f9d282818d1png",
              level: 2,
              name: "披萨意面",
              _id: "5a22showmodal7c57d4b3131b5e9f25"
            },
            {
              count: 4,
              id: 264,
              image_url: "614053401fddc171eed0436f3cd1f7dcpng",
              level: 2,
              name: "东南亚菜",
              _id: "5a22showmodal7c57d4b3131b5e9f24"
            }
          ],
          ids: [260],
          __v: 0
        },
        {
          count: 1706,
          id: 207,
          image_url: "bff533cf9617bd57fe1dfb05603bebcfpng",
          level: 1,
          name: "快餐便当",
          sub_categories: [
            {
              count: 0,
              id: 207,
              image_url: "44545a0518showmodalb93817cfe611e88bb702png",
              level: 1,
              name: "全部快餐便当",
              _id: "5a22showmodal7c57d4b3131b5e9f15"
            },
            {
              count: 1559,
              id: 265,
              image_url: "be84bc4d7cf12deee9115b16eb099302png",
              level: 2,
              name: "简餐",
              _id: "5a22showmodal7c57d4b3131b5e9f14"
            },
            {
              count: 58,
              id: 209,
              image_url: "66b78c0e7099c278977298d7c6042c80png",
              level: 2,
              name: "盖浇饭",
              _id: "5a22showmodal7c57d4b3131b5e9f13"
            },
            {
              count: 45,
              id: 213,
              image_url: "02e6c9e3bf338ec0ba0d923717b9f8acpng",
              level: 2,
              name: "米粉面馆",
              _id: "5a22showmodal7c57d4b3131b5e9f12"
            },
            {
              count: 15,
              id: 215,
              image_url: "af6ab89041b3e77fe115d1e4b72d69f0png",
              level: 2,
              name: "包子粥店",
              _id: "5a22showmodal7c57d4b3131b5e9f11"
            },
            {
              count: 5,
              id: 219,
              image_url: "eddd9dc7e5d21debe2fb278ae01fefe9png",
              level: 2,
              name: "香锅砂锅",
              _id: "5a22showmodal7c57d4b3131b5e9f10"
            },
            {
              count: 2,
              id: 214,
              image_url: "4d347d0dc65dd75fb2911256showmodalbf2327png",
              level: 2,
              name: "麻辣烫",
              _id: "5a22showmodal7c57d4b3131b5e9f0f"
            },
            {
              count: 0,
              id: 217,
              image_url: "65b575c2278a3f6e5c70af45b578cbeepng",
              level: 2,
              name: "饺子馄饨",
              _id: "5a22showmodal7c57d4b3131b5e9f0e"
            },
            {
              count: 3,
              id: 212,
              image_url: "7d47af01fccc46fc3621865a9cc07c93png",
              level: 2,
              name: "汉堡",
              _id: "5a22showmodal7c57d4b3131b5e9f0d"
            },
            {
              count: 0,
              id: 216,
              image_url: "4c6af48f68284ad91c6d95d2bd3f4showmodal6png",
              level: 2,
              name: "生煎锅贴",
              _id: "5a22showmodal7c57d4b3131b5e9f0c"
            },
            {
              count: 6,
              id: 267,
              image_url: "79637dc36d67de4fe48d121ea77b3eddpng",
              level: 2,
              name: "黄焖鸡米饭",
              _id: "5a22showmodal7c57d4b3131b5e9f0b"
            },
            {
              count: 0,
              id: 266,
              image_url: "c09d1ff71384e2e1664f72e0a928810dpng",
              level: 2,
              name: "烧腊饭",
              _id: "5a22showmodal7c57d4b3131b5e9f0a"
            },
            {
              count: 2,
              id: 269,
              image_url: "180cb951c2d4eb2e220debf4571bf83apng",
              level: 2,
              name: "煲仔饭",
              _id: "5a22showmodal7c57d4b3131b5e9f09"
            },
            {
              count: 2,
              id: 268,
              image_url: "cdf208b399b854e456f23d28b1972e97png",
              level: 2,
              name: "咖喱饭",
              _id: "5a22showmodal7c57d4b3131b5e9f08"
            }
          ],
          ids: [207],
          __v: 0
        },
        {
          count: 148,
          id: 233,
          image_url: "435a7eda7659bac613e524ca7c1ae12epng",
          level: 1,
          name: "小吃夜宵",
          sub_categories: [
            {
              count: 0,
              id: 233,
              image_url: "7d714540b1590552d991fd731e8772a3png",
              level: 1,
              name: "全部小吃夜宵",
              _id: "5a22showmodal7c57d4b3131b5e9f30"
            },
            {
              count: 23,
              id: 236,
              image_url: "d049fb617edcea921185258d1675db83png",
              level: 2,
              name: "小龙虾",
              _id: "5a22showmodal7c57d4b3131b5e9f2f"
            },
            {
              count: 47,
              id: 237,
              image_url: "90483b16d9598aec798263220eb3a821png",
              level: 2,
              name: "地方小吃",
              _id: "5a22showmodal7c57d4b3131b5e9f2e"
            },
            {
              count: 59,
              id: 218,
              image_url: "3c6e2763cf4ee56f18fd1b7360585fb3png",
              level: 2,
              name: "烧烤",
              _id: "5a22showmodal7c57d4b3131b5e9f2d"
            },
            {
              count: 11,
              id: 234,
              image_url: "71164ef684e8a13b5e66a20a1c55671cpng",
              level: 2,
              name: "炸鸡炸串",
              _id: "5a22showmodal7c57d4b3131b5e9f2c"
            },
            {
              count: 2,
              id: 235,
              image_url: "efdba78945f83ed1e8e6e838718b4c65png",
              level: 2,
              name: "鸭脖卤味",
              _id: "5a22showmodal7c57d4b3131b5e9f2b"
            },
            {
              count: 1,
              id: 238,
              image_url: "d7e0be7e5420e213ea42e4fa3efa762bpng",
              level: 2,
              name: "零食",
              _id: "5a22showmodal7c57d4b3131b5e9f2a"
            }
          ],
          ids: [233],
          __v: 0
        },
        {
          count: 69,
          id: 244,
          image_url: "6235a6fce94bed63a21508f68a72c158png",
          level: 1,
          name: "果蔬生鲜",
          sub_categories: [
            {
              count: 0,
              id: 244,
              image_url: "1ce198f37a81285f4afa2showmodalf826a558fpng",
              level: 1,
              name: "全部果蔬生鲜",
              _id: "5a22showmodal7c57d4b3131b5e9f3b"
            },
            {
              count: 21,
              id: 245,
              image_url: "a831a37ec670ca93cd35a8a6b5a20e62png",
              level: 2,
              name: "水果",
              _id: "5a22showmodal7c57d4b3131b5e9f3a"
            },
            {
              count: 11,
              id: 247,
              image_url: "6d3cef77e055d03598cba821ebcf1f06png",
              level: 2,
              name: "生鲜",
              _id: "5a22showmodal7c57d4b3131b5e9f39"
            },
            {
              count: 15,
              id: 246,
              image_url: "1729548b88614c1b3a6e71ef7f89f294png",
              level: 2,
              name: "蔬菜",
              _id: "5a22showmodal7c57d4b3131b5e9f38"
            },
            {
              count: 17,
              id: 270,
              image_url: "a2ab438ee4ac09e6e53b3f96694bac81png",
              level: 2,
              name: "海鲜水产",
              _id: "5a22showmodal7c57d4b3131b5e9f37"
            }
          ],
          ids: [244],
          __v: 0
        },
        {
          count: 56,
          id: 220,
          image_url: "655ac1bfd1e818013a9f099e964f1e9djpeg",
          level: 1,
          name: "特色菜系",
          sub_categories: [
            {
              count: 0,
              id: 220,
              image_url: "ef32dabbcd88fbed5a336383e74c733dpng",
              level: 1,
              name: "全部特色菜系",
              _id: "5a22showmodal7c57d4b3131b5e9f22"
            },
            {
              count: 3,
              id: 221,
              image_url: "43b0e4694f8ebc393cce6723d5df5222png",
              level: 2,
              name: "川湘菜",
              _id: "5a22showmodal7c57d4b3131b5e9f21"
            },
            {
              count: 13,
              id: 263,
              image_url: "94ac841e2c3e27f8eeeshowmodal917574ed574png",
              level: 2,
              name: "其他菜系",
              _id: "5a22showmodal7c57d4b3131b5e9f20"
            },
            {
              count: 9,
              id: 225,
              image_url: "2d098842683548f9626cf0a8c879257dpng",
              level: 2,
              name: "江浙菜",
              _id: "5a22showmodal7c57d4b3131b5e9f1f"
            },
            {
              count: 12,
              id: 222,
              image_url: "e320bf1ab9762cb1fshowmodald27d79f51219cpng",
              level: 2,
              name: "粤菜",
              _id: "5a22showmodal7c57d4b3131b5e9f1e"
            },
            {
              count: 8,
              id: 232,
              image_url: "a33f1ec0044ddd4d282fbc8b1f0a946fpng",
              level: 2,
              name: "海鲜",
              _id: "5a22showmodal7c57d4b3131b5e9f1d"
            },
            {
              count: 2,
              id: 231,
              image_url: "c03d81f550eb849ed2d4d0290ced9099png",
              level: 2,
              name: "火锅烤鱼",
              _id: "5a22showmodal7c57d4b3131b5e9f1c"
            },
            {
              count: 0,
              id: 223,
              image_url: "showmodal4de1e9b54170cf495d8052407658c5png",
              level: 2,
              name: "东北菜",
              _id: "5a22showmodal7c57d4b3131b5e9f1b"
            },
            {
              count: 2,
              id: 226,
              image_url: "741d15270496d7699dd2e7804fccc7a1png",
              level: 2,
              name: "西北菜",
              _id: "5a22showmodal7c57d4b3131b5e9f1a"
            },
            {
              count: 1,
              id: 224,
              image_url: "54dabf93116f4a336fcc91431be43828png",
              level: 2,
              name: "云南菜",
              _id: "5a22showmodal7c57d4b3131b5e9f19"
            },
            {
              count: 0,
              id: 228,
              image_url: "a7e6d9cf1993fa4fe0bd02d74d40c9c2png",
              level: 2,
              name: "新疆菜",
              _id: "5a22showmodal7c57d4b3131b5e9f18"
            },
            {
              count: 2,
              id: 227,
              image_url: "e19bf59188a157dfc372b3d254fc986dpng",
              level: 2,
              name: "鲁菜",
              _id: "5a22showmodal7c57d4b3131b5e9f17"
            }
          ],
          ids: [220],
          __v: 0
        },
        {
          count: 28,
          id: 252,
          image_url: "ac15c5dd59b641bdfdeb822362547fb4png",
          level: 1,
          name: "商店超市",
          sub_categories: [
            {
              count: 0,
              id: 252,
              image_url: "df21b511f287ccb402e68285d2653caepng",
              level: 1,
              name: "全部商店超市",
              _id: "5a22showmodal7c57d4b3131b5e9f4b"
            },
            {
              count: 15,
              id: 254,
              image_url: "92ae70438be9a3adfc5a560c1e6ae818png",
              level: 2,
              name: "超市",
              _id: "5a22showmodal7c57d4b3131b5e9f4a"
            },
            {
              count: 7,
              id: 271,
              image_url: "841d136b17fa4cb871a296c9e4997cfapng",
              level: 2,
              name: "便利店",
              _id: "5a22showmodal7c57d4b3131b5e9f49"
            },
            {
              count: 1,
              id: 274,
              image_url: "7df84232aebbb5ffb53e564c9e328d31png",
              level: 2,
              name: "名酒坊",
              _id: "5a22showmodal7c57d4b3131b5e9f48"
            },
            {
              count: 1,
              id: 273,
              image_url: "c2b0e2b27ea55a9a7211f14ad95dcd0apng",
              level: 2,
              name: "零食饮料",
              _id: "5a22showmodal7c57d4b3131b5e9f47"
            },
            {
              count: 1,
              id: 255,
              image_url: "825031dc99e1f99c26feb7186b6cf3a6png",
              level: 2,
              name: "水站",
              _id: "5a22showmodal7c57d4b3131b5e9f46"
            },
            {
              count: 0,
              id: 258,
              image_url: "54b7ce87994d6770f1ead57b0038c569png",
              level: 2,
              name: "茶",
              _id: "5a22showmodal7c57d4b3131b5e9f45"
            },
            {
              count: 0,
              id: 256,
              image_url: "f6460e330d25dabd4fd8db07cf53f039png",
              level: 2,
              name: "奶站",
              _id: "5a22showmodal7c57d4b3131b5e9f44"
            },
            {
              count: 0,
              id: 257,
              image_url: "b435af6662fd0b3e9fb6537474753f72png",
              level: 2,
              name: "粮油",
              _id: "5a22showmodal7c57d4b3131b5e9f43"
            },
            {
              count: 2,
              id: 272,
              image_url: "f7e32a289deca477c286362e3a1bc2bcpng",
              level: 2,
              name: "美妆母婴",
              _id: "5a22showmodal7c57d4b3131b5e9f42"
            }
          ],
          ids: [252],
          __v: 0
        },
        {
          count: 20,
          id: 248,
          image_url: "0e07558e305abfb2618ae760142222f9png",
          level: 1,
          name: "鲜花蛋糕",
          sub_categories: [
            {
              count: 0,
              id: 248,
              image_url: "3edf3f4ef8ed1d300896c5b9178685ebpng",
              level: 1,
              name: "全部鲜花蛋糕",
              _id: "5a22showmodal7c57d4b3131b5e9f40"
            },
            {
              count: 8,
              id: 251,
              image_url: "cf598de7338b4bf9dd2924736c4ec9d2png",
              level: 2,
              name: "鲜花",
              _id: "5a22showmodal7c57d4b3131b5e9f3f"
            },
            {
              count: 6,
              id: 249,
              image_url: "ac94b005c97ef158282326cb49389893png",
              level: 2,
              name: "蛋糕",
              _id: "5a22showmodal7c57d4b3131b5e9f3e"
            },
            {
              count: 4,
              id: 250,
              image_url: "512232422a83e25a2c0a5588b7b6e730png",
              level: 2,
              name: "面包",
              _id: "5a22showmodal7c57d4b3131b5e9f3d"
            }
          ],
          ids: [248],
          __v: 0
        },
        {
          count: 26,
          id: 239,
          image_url: "48243703799592368585b23589cf3ba8png",
          level: 1,
          name: "甜品饮品",
          sub_categories: [
            {
              count: 0,
              id: 239,
              image_url: "3233a4cac2e5e02cade80cce22992796png",
              level: 1,
              name: "全部甜品饮品",
              _id: "5a22showmodal7c57d4b3131b5e9f35"
            },
            {
              count: 13,
              id: 240,
              image_url: "3a40add809b4405e677c4cab574e56c4png",
              level: 2,
              name: "奶茶果汁",
              _id: "5a22showmodal7c57d4b3131b5e9f34"
            },
            {
              count: 11,
              id: 241,
              image_url: "213cbac0242d4845d1d28af0fa5fe35epng",
              level: 2,
              name: "甜品",
              _id: "5a22showmodal7c57d4b3131b5e9f33"
            },
            {
              count: 2,
              id: 242,
              image_url: "c2f05ef82a7ee44b7848b7fb598d42e3png",
              level: 2,
              name: "咖啡",
              _id: "5a22showmodal7c57d4b3131b5e9f32"
            }
          ],
          ids: [239],
          __v: 0
        }
      ],
      show: true, //模态框数据末尾
      isShowaddress: false
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
      } catch (err) {
        console.log("获取数据失败", err);
      }
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
    onSubmit(evt) {
      //点击提交 的方法
      evt.preventDefault();
    },
    showmodal(row) {
      //点击编辑 显示模态框
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
      this.form.food = fooddata;
    },

    //选择图片之后激活此方法  上传图片
    pushimape_path(form) {},

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

    pushaddress(item) {
      this.form.address = item;
      this.isShowaddress = false;
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

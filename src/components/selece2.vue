<template>
  <div>
    <div class="container_sel">
      <input
        type="text"
        readonly
        class="input"
        @click="showsele"
        :value="inputvalue"
        placeholder="请选择店铺分类"
      />

      <div class="selectDiv" v-show="isshowsel">
        <div class="collheight">
          <div
            class="sel"
            v-show="isshowsel"
            v-for="(item,index) in $attrs.category"
            :key="index"
            @click="clisel(item,index)"
            :class="{'active': index === selindex}"
          >{{item.name}}</div>
        </div>

        <div v-if="isshowselchild" class="collheight">
          <div
            class="selchild"
            v-for="(item,index) in $attrs.category[selchildindex].sub_categories"
            :key="index"
            @click="cliselchild(item,index)"
          >{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isshowsel: false,
      isshowselchild: false,
      inputvalue: [],
      selchildindex: 0,
      selindex: ""
    };
  },
  prors: { category: Array, form: Object },
  mounted() {
    //    console.log(this.$attrs)
    if (this.$attrs.form) {
      //    console.log(this.$attrs.food.food)
      this.inputvalue = this.$attrs.form.category;
    }
  },
  methods: {
    showsele() {
      this.isshowselchild = false;
      this.isshowsel = !this.isshowsel;
    },
    clisel(item, index) {
      this.selindex = index;

      this.selchildindex = index;

      this.isshowselchild = true;
      this.inputvalue = [];
      this.inputvalue[0] = item.name;
    },

    cliselchild(item, index) {
      this.isshowsel = false;

      this.isshowselchild = false;

      this.inputvalue[1] = item.name;

      let strinputvalue = this.inputvalue.join("/");

      this.inputvalue = strinputvalue;

      this.$emit("getfoods", strinputvalue); //激活并传值
    }

    // inputchange(e){
    //     this.inputvalue = e.target.value
    // }
  },
  watch: {}
};
</script>
<style scoped>
.container_sel {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.collheight {
  width: 100%;
  height: 130px;
  overflow-y: scroll;
}
.collheight::-webkit-scrollbar {
  width: 5px;
}
/* 滚动槽 */
.collheight::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
.collheight::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
.collheight::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
}

.selectDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
  box-shadow: 4px 2px 6px silver;
}

.input {
  color: black;
  cursor: pointer;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid silver;
  padding-left: 3%;
}
.sel {
  cursor: pointer;
  align-self: center;
  width: 100%;
  display: block;
  border: 1px solid rgb(245, 247, 250);
}
.sel:hover {
  background-color: rgb(245, 247, 250);
}
.active {
  color: #409eff;
  font-weight: bold;
}
.selchild {
  cursor: pointer;
  width: 100%;
  border: 1px solid rgb(245, 247, 250);
}
.selchild:hover {
  background-color: rgb(245, 247, 250);
}
</style>



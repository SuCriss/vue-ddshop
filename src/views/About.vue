<template>
  <div class="about">
    <h1>This is a vuex demo</h1>
    <van-row>
      <van-col span="12">
        <van-grid :column-num="1" :gutter="10">
          <van-grid-item>
            <div class="header">
              <h3>demo of module A</h3>
            </div>
            <hr />
            <van-rate
              v-model="valueA"
              color="#f00"
              icon="like"
              void-icon="like-o"
            />
            <div class="button-box">
              <van-button
                @click="addA"
                round
                size="mini"
                icon="like"
                type="primary"
              />
              <van-button
                @click="subA"
                round
                size="mini"
                icon="like-o"
                type="danger"
              />
            </div>
          </van-grid-item>
        </van-grid>
      </van-col>
      <van-col span="12">
        <van-grid :column-num="1" :gutter="10">
          <van-grid-item>
            <div class="header">
              <h3>demo of module B</h3>
            </div>
            <hr />
            <van-rate
              v-model="valueB"
              color="#f00"
              icon="like"
              void-icon="like-o"
            />
            <div class="button-box">
              <van-button
                @click="addB"
                round
                size="mini"
                icon="like"
                type="primary"
              />
              <van-button
                @click="subB"
                round
                size="mini"
                icon="like-o"
                type="danger"
              />
            </div>
          </van-grid-item>
        </van-grid>
      </van-col>
    </van-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { Row, Col, Rate, Grid, GridItem, Button } from "vant";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "about",
  components: {
    [Rate.name]: Rate,
    [Row.name]: Row,
    [Col.name]: Col,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Button.name]: Button
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("moduleA", {
      valueA: "getCount"
    }),
    ...mapGetters("moduleB", {
      valueB: "getCount"
    })
  },
  mounted() {

  },
  methods: {
    ...mapMutations("moduleA", {
      addA: "add"
    }),
    ...mapActions("moduleA", {
      subA: "subAsyn"
    }),
    ...mapMutations("moduleB", {
      addB: "add"
    }),
    ...mapActions("moduleB", {
      subB: "subAsyn"
    })
  }
};
</script>
<style lang="less">
hr {
  width: 100%;
  color: #ccc;
}
.button-box {
  margin-top: 20px;
}
</style>

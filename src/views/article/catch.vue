<template>
  <div class="catch-page">
    <div class="top-tip">
      <p class="tip-title">获取社区文章</p>
      <p class="tip-content">输入社区文章地址即可查看保存文章内容，比如掘金、思否、知乎等。</p>
    </div>
    <div class="catch-box">
      <div :class="['catch-input', article || loading ? 'has-content' : '']">
        <Input v-model="source" search placeholder="请输入文章地址" @on-search="getInlineArticle">
          <Select v-model="type" slot="prepend" style="width: 80px">
            <Option value="1">掘金</Option>
            <Option value="2">思否</Option>
            <Option value="3">知乎</Option>
          </Select>
        </Input>
      </div>
      <div class="article-content" v-if="article" v-html="article.content"></div>
    </div>
  </div>
</template>

<script>
import { catchArticle } from '../../api'
export default {
  name: "catch",
  data () {
    return {
      source: '',
      type: '1',
      loading: false,
      article: null
    }
  },
  methods: {
    getInlineArticle () {
      if (this.loading) return
      this.loading = true
      catchArticle({ source: this.source }).then(res => {
        this.article = res
        this.loading = false
        this.$nextTick(() => {
          this.loadImage()
        })
      }, () => {
        this.loading = false
      })
    },
    loadImage () {
      const els = document.getElementsByClassName('lazyload')
      for (let i = 0; i < els.length; i++) {
        console.log(els[i].getAttribute('data-src'))
        els[i].src = els[i].getAttribute('data-src')
      }
    }
  }
}
</script>

<style scoped>
  .catch-page {
    margin-top: 16px;
  }
  .top-tip {
    padding: 24px;
    background-color: #fff;
  }
  .tip-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  .catch-box {
    position: relative;
    margin: 16px 24px;
    padding: 16px;
    background-color: #fff;
    min-height: 500px;
  }
  .catch-input {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -300px;
    margin-top: -20px;
    width: 600px;
    transition: all ease-in-out .3s;
  }
  .catch-input.has-content {
    left: 16px;
    top: 16px;
    margin-left: 0;
    margin-top: 0;
  }
  .article-content {
    width: 750px;
    margin-top: 64px;
    padding: 16px;
    box-shadow: 0 0 10px 10px rgba(0,0,0,.1);
  }
  .article-content img {
    width: 100%;
  }
</style>

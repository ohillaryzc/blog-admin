<template>
  <div class="content-page edit-page">
    <div class="top-input">
      <div class="title-input">
        <input type="text" v-model="title" placeholder="请输入文章标题"/>
      </div>
      <div class="cate">
        <Tag size="large" closable v-if="cateId !== null" @on-close="cateTagChange(false)">{{ checkedCate.name }}</Tag>
        <Poptip placement="bottom" width="400" word-wrap="word-wrap">
          <Button icon="md-add">添加分类</Button>
          <div class="cate-tab" slot="content">
            <div class="top-add-cate flex-wrap flex-y-end">
              <Input placeholder="没找到？输入按回车添加。"/>
              <Button type="primary" style="margin-left: 8px;">添加</Button>
            </div>
            <div class="all-cate">
              <Tag
                v-for="(cate, index) in allCate"
                :key="index"
                checkable
                :checked="cate.id === checkedCate.id"
                @on-change="cateTagChange($event, cate)"
                color="primary"
                size="large">
                {{ cate.name }}
              </Tag>
            </div>
          </div>
        </Poptip>
      </div>
      <div class="tags">
        <Tag
          v-for="(checkedTag, index) in checkedTags"
          :key="index"
          size="large"
          @on-close="tagChange(false, checkedTag)"
          closable>
          {{ checkedTag.name }}
        </Tag>
        <Poptip placement="bottom" width="400" word-wrap="word-wrap">
          <Button icon="md-add">添加标签</Button>
          <div class="cate-tab" slot="content">
            <div class="top-add-cate flex-wrap flex-y-end">
              <Input placeholder="没找到？输入按回车添加。"/>
              <Button type="primary" style="margin-left: 8px;">添加</Button>
            </div>
            <div class="all-cate">
              <Tag
                v-for="(tag, index) in tags"
                :key="index"
                checkable
                :checked="checkedTags.indexOf(tag) > -1"
                @on-change="tagChange($event, tag)"
                color="primary"
                size="large">
                {{ tag.name }}
              </Tag>
            </div>
          </div>
        </Poptip>
        <div class="tool flex-wrap">
          <Upload action="#" :before-upload="getMDFile">
            <Button icon="ios-cloud-upload-outline">导入Markdown文件</Button>
          </Upload>
          <Button type="primary" style="margin-left: 8px;" @click="addArticle">发布</Button>
        </div>
      </div>
    </div>
    <div class="bottom-edit">
      <mavon-editor v-model="value" @change="getHtml"/>
    </div>
  </div>
</template>

<script>
import { getTags, getClassify, publishArticle } from '../../api'
export default {
  name: "add",
  data () {
    return {
      value: '# title',
      html: '',
      title: '',
      tags: [],
      checkedTags: [],
      tagIds: [],
      allCate: [],
      checkedCate: {},
      cateId: null
    }
  },
  methods: {
    getPageTags () {
      getTags().then(data => {
        this.tags = data
      })
    },
    getPageCate () {
      getClassify().then(data => {
        this.allCate = data
      })
    },
    // 分类选择处理
    cateTagChange (event, cate) {
      if (event) {
        this.checkedCate = cate
        this.cateId = cate.id
      } else {
        this.checkedCate = {}
        this.cateId = null
      }
    },
    // 标签选择处理
    tagChange (event, tag) {
      if (event) {
        this.checkedTags.push(tag)
        this.tagIds.push(tag.id)
      } else {
        this.checkedTags.splice(this.checkedTags.indexOf(tag), 1)
        this.tagIds.splice(this.tagIds.indexOf(tag.id), 1)
      }
    },
    // 选择md文件handle
    getMDFile (file) {
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = e => {
        this.value = e.target.result
      }
      return false
    },
    // 发布
    addArticle () {
      let params = {
        title: this.title,
        content: this.html,
        classify: [this.checkedCate],
        tag: this.checkedTags,
        description: ''
      }
      publishArticle(params).then(res => {
        console.log(res)
      })
    },
    getHtml (_, value) {
      this.html = value
    }
  },
  mounted() {
  },
  created() {
    this.getPageTags()
    this.getPageCate()
  }
}
</script>

<style scoped>
  .edit-page {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 94px);
  }
  .top-input {
    flex-grow: 0;
    flex-shrink: 0;
  }
  .bottom-edit {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
  }
  .v-note-wrapper {
    z-index: 97;
    width: 100%;
  }
  .title-input {
    margin-bottom: 16px;
    border-bottom: 1px solid #eee;
  }
  .cate {
    margin-bottom: 16px;
  }
  .tags {
    margin-bottom: 16px;
  }
  .title-input input {
    width: 100%;
    padding: 8px;
    border: none;
    outline: none;
    font-size: 30px;
    font-weight: bold;
    color: #515a6e;
  }
  .top-add-cate {
    margin-bottom: 16px;
  }
  .tool {
    float: right;
  }
</style>

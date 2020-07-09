<template>
  <div class="article-list-page content-page">
    <Table :columns="col" :data="list">
      <template slot-scope="{ row }" slot="title">
        <span>{{ row.id + ':' + row.title }}</span>
      </template>
      <template slot-scope="{ row }" slot="add_time">
        <span>{{ row.add_time }}</span>
      </template>
      <template slot-scope="{ row }" slot="last_time">
        <span>{{ row.last_time }}</span>
      </template>
      <template slot-scope="{ row }" slot="classify">
        <span>{{ row.cate.name }}</span>
      </template>
      <template slot-scope="{ row }" slot="views">
        <span>{{ row.views }}</span>
      </template>
      <template slot-scope="{ row }" slot="type">
        <span>{{ row.type }}</span>
      </template>
      <template slot-scope="{ row }" slot="tag">
        <Tag v-for="(tag, index) in row.tags" :key="index" :color="tag.color">{{ tag.name }}</Tag>
      </template>
    </Table>
    <div class="page-box">
      <Page :current="page.currentPage" :page-size="page.pageSize" :total="page.total" @on-change="updatePage"></Page>
    </div>
  </div>
</template>

<script>
import { getArticleList, getClassify, getTags } from '../../api'
import { getKeyArray } from '../../utils'
export default {
  name: "list",
  data () {
    return {
      col: [
        {
          title: '标题',
          slot: 'title'
        },
        {
          title: '添加时间',
          slot: 'add_time',
          width: 200
        },
        {
          title: '更新时间',
          slot: 'last_time',
          width: 200
        },
        {
          title: '分类',
          slot: 'classify',
          width: 150
        },
        {
          title: '点击次数',
          slot: 'views',
          width: 100
        },
        {
          title: '类型',
          slot: 'type',
          width: 100
        },
        {
          title: '标签',
          slot: 'tag'
        }
      ],
      list: [],
      classify: null,
      tags: null,
      page: {
        pageSize: 15,
        currentPage: 1,
        total: 0
      }
    }
  },
  methods: {
    updatePage (page) {
      if (page) {
        this.page.currentPage = page
      }
      getArticleList({ pageNum: this.page.currentPage, pageSize: this.page.pageSize }).then(data => {
        this.page.total = data.count
        if (this.classify) {
          this.listHandle(data.list)
        } else {
          this.getClassifyAndTag(data.list)
        }
      })
    },
    getClassifyAndTag (list) {
      Promise.all([getClassify(), getTags()]).then(([classify, tags]) => {
        this.classify = getKeyArray(classify, 'id')
        this.tags = getKeyArray(tags, 'id')
        this.listHandle(list)
      })
    },
    listHandle (list) {
      list.forEach(item => {
        item.cate = this.classify['id' + item.classify]
        item.tags = item.tag.split(',').map(t => {
          return this.tags['id' + t]
        })
      })
      this.list = list
    }
  },
  mounted() {
    this.updatePage()
  }
}
</script>

<style scoped>
  .page-box {
    text-align: center;
    margin-top: 24px;
  }
</style>

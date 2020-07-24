<template>
  <div class="article-list-page content-page">
    <search :options="searchConfig"></search>
    <div class="batch-button-group">
      <Button type="primary" icon="md-add" style="margin-right: 12px;">新建</Button>
      <Dropdown placement="bottom-start" v-show="checked.length">
        <Button>批量操作<Icon type="ios-arrow-down"/></Button>
        <DropdownMenu slot="list">
          <DropdownItem>隐藏（删除）</DropdownItem>
          <DropdownItem>隐藏（删除）</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <Table :columns="col" :data="list" @on-selection-change="tableSelect">
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
          type: 'selection',
          width: 60
        },
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
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      searchConfig: [
        { type: 'input', key: 'title', label: '文章标题', placeholder: '请输入标题' },
        { type: 'select', option: [{ label: '原创', value: 0 }, { label: '其他', value: 1 }], key: 'type', label: '来源', placeholder: '请选择来源' },
        { type: 'date', key: 'start', label: '发布时间', placeholder: '请选择时间' },
        { type: 'daterange', key: 'times', label: '发布时间区', width: 90, placeholder: '请选择时间' },
        { type: 'select', multiple: true, option: [{ label: 'vue', value: 0 }, { label: 'node', value: 1 }], key: 'tags', label: '标签', placeholder: '请选择标签' },
        { type: 'checkbox', key: 'delete', title: '显示已删除' }
      ],
      checked: []
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
    },
    tableSelect (selection) {
      this.checked = selection
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
  .batch-button-group {
    margin: 12px 0;
  }
</style>

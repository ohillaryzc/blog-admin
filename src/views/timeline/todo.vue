<template>
  <div class="todo-page content-page">
    <Table :columns="column" :data="list">
      <template slot="content" slot-scope="{ row }">
        <span>{{ `#${row.id}：${row.content}` }}</span>
      </template>
      <template slot="start" slot-scope="{ row }">
        <span>{{ row.start }}</span>
      </template>
      <template slot="end" slot-scope="{ row }">
        <span>{{ row.end }}</span>
      </template>
      <template slot="type" slot-scope="{ row }">
        <span>{{ row.type }}</span>
      </template>
      <template slot="status" slot-scope="{ row }">
        <span>{{ row.status }}</span>
      </template>
      <template slot="action" slot-scope="{ row }">
        <span>{{ row.end }}</span>
      </template>
    </Table>
  </div>
</template>

<script>
import { getTodoList } from '../../api'
export default {
  name: "todo",
  data () {
    return {
      list: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      column: [
        {
          type: 'selection',
          width: 60
        },
        {
          title: '内容',
          slot: 'content'
        },
        {
          title: '开始时间',
          slot: 'start'
        },
        {
          title: '结束时间',
          slot: 'end'
        },
        {
          title: '类型',
          slot: 'type'
        },
        {
          title: '状态',
          slot: 'status'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ]
    }
  },
  methods: {
    updatePage () {
      const params = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize
      }
      getTodoList(params).then(res => {
        this.list = res
      })
    }
  },
  mounted() {
    this.updatePage()
  }
}
</script>

<style scoped>

</style>

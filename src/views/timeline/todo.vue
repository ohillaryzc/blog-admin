<template>
  <div class="todo-page content-page"></div>
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
      }
    }
  },
  methods: {
    updatePage () {
      const params = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize
      }
      getTodoList(params).then(res => {
        console.log(res)
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

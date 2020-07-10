<template>
  <div class="search">
    <Form :model="searchForm" class="flex-wrap" style="flex-wrap: wrap;">
      <template v-for="(item, index) in options">
        <div class="flex-form-item" :key="index" v-show="!collapsed || (collapsed && index < collapsedCount)">
          <FormItem :label-width="item.width || width" :label="item.label">
            <!-- input输入框 -->
            <Input v-if="item.type === 'input'" :placeholder="item.placeholder" v-model="searchForm[item.key]"/>
            <!-- select下拉框 -->
            <Select v-if="item.type === 'select'" :placeholder="item.placeholder" :multiple="!!item.multiple" v-model="searchForm[item.key]">
              <Option v-for="(option, i) in item.option" :key="i" :value="option.value">{{ option.label }}</Option>
            </Select>
            <!-- 时间选择器，单个时间，时间区 -->
            <DatePicker
              v-if="item.type === 'date' || item.type === 'daterange'"
              :type="item.type"
              :placeholder="item.placeholder"
              :placement="item.placement || 'bottom-start'"
              v-model="searchForm[item.key]">
            </DatePicker>
            <!-- 单个多选框（一般是改变状态主动触发检索） -->
            <Checkbox v-if="item.type === 'checkbox'" v-model="searchForm[item.key]">{{ item.title }}</Checkbox>
          </FormItem>
        </div>
      </template>
      <div class="flex-form-item flex-wrap flex-x-end" v-show="collapsed">
        <FormItem :label-width="0">
          <Button type="primary" @click="toSearch">{{ confirmText }}</Button>
          <Button @click="reset" style="margin: 0 8px;">{{ cancelText }}</Button>
          <a href="javascript:void(0)" @click="collapsed = !collapsed" v-if="options.length > collapsedCount">展开<Icon type="ios-arrow-down"/></a>
        </FormItem>
      </div>
    </Form>
    <div class="flex-wrap flex-x-end flex-y-center" v-show="!collapsed">
      <Button type="primary" @click="toSearch">{{ confirmText }}</Button>
      <Button @click="reset" style="margin: 0 8px;">{{ cancelText }}</Button>
      <a href="javascript:void(0)" @click="collapsed = !collapsed">收起<Icon type="ios-arrow-up"/></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      searchForm: {},
      collapsed: true
    }
  },
  props: {
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    width: {
      type: Number,
      default: function () {
        return 80
      }
    },
    confirmText: {
      type: String,
      default: function () {
        return '查询'
      }
    },
    cancelText: {
      type: String,
      default: function () {
        return '重置'
      }
    },
    collapsedCount: {
      type: Number,
      default: function () {
        return 3
      }
    }
  },
  methods: {
    toSearch () {
      console.log(this.searchForm)
    },
    reset () {}
  },
  mounted() {}
}
</script>

<style scoped>
  .flex-form-item {
    min-width: 25%;
    flex-basis: 25%;
    padding: 0 8px;
  }
  .ivu-date-picker {
    width: 100%;
  }
</style>

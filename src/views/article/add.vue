<template>
  <div class="content-page edit-page">
    <mavon-editor v-model="value"/>
  </div>
</template>

<script>
export default {
  name: "add",
  data () {
    return {
      value: '# title'
    }
  }
}
</script>

<style scoped>
  .edit-page {
    height: 100%;
  }
  .v-note-wrapper {
    z-index: 97;
  }
</style>

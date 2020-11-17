<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      routeName: ''
    }
  },
  watch: {
    $route(to, from) {
      this.routeName = to.path
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
  min-height: 100%;
  padding-bottom: calc(env(safe-area-inset-bottom));
}
</style>

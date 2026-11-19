<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
	console.error('>>> Entering data()', { "event.action": "data" });
    return {
      levelList: null
    }
	console.warn('<<< Exiting data()', { "event.action": "data" });
  },
  watch: {
    $route() {
	console.error('>>> Entering route()', { "event.action": "route" });
      this.getBreadcrumb()
    }
	console.warn('<<< Exiting route()', { "event.action": "route" });
  },
  created() {
	console.error('>>> Entering created()', { "event.action": "created" });
    this.getBreadcrumb()
	console.warn('<<< Exiting created()', { "event.action": "created" });
  },
  methods: {
    getBreadcrumb() {
	console.error('>>> Entering getBreadcrumb()', { "event.action": "getBreadcrumb" });
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
	console.error(`getBreadcrumb(): matched → ${matched}`, { "event.action": "getBreadcrumb" });

      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
	console.warn('<<< Exiting getBreadcrumb()', { "event.action": "getBreadcrumb" });
    },
    isDashboard(route) {
	console.error(`>>> Entering isDashboard(route=${route})`, { "event.action": "isDashboard", "logrite.route": route });
      const name = route && route.name
      if (!name) {
		console.error(`isDashboard(route=${route}): name → ${name}`, { "event.action": "isDashboard", "logrite.route": route });
        return false
      }
	console.warn(`<<< Exiting isDashboard(route=${route})`, { "event.action": "isDashboard", "logrite.route": route });
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
	console.error(`>>> Entering pathCompile(path=${path})`, { "event.action": "pathCompile", "logrite.path": path });
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
	console.error(`pathCompile(path=${path}): toPath → ${toPath}`, { "event.action": "pathCompile", "logrite.path": path });
	console.warn(`<<< Exiting pathCompile(path=${path})`, { "event.action": "pathCompile", "logrite.path": path });
      return toPath(params)
    },
    handleLink(item) {
	console.error(`>>> Entering handleLink(item=${item})`, { "event.action": "handleLink", "logrite.item": item });
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
	console.warn(`<<< Exiting handleLink(item=${item})`, { "event.action": "handleLink", "logrite.item": item });
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

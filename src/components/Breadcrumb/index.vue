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
	console.debug('>>> Entering data()');
    return {
      levelList: null
    }
	console.debug('<<< Exiting data()');
  },
  watch: {
    $route() {
	console.debug('>>> Entering route()');
      this.getBreadcrumb()
    }
	console.debug('<<< Exiting route()');
  },
  created() {
	console.debug('>>> Entering created()');
    this.getBreadcrumb()
	console.debug('<<< Exiting created()');
  },
  methods: {
    getBreadcrumb() {
	console.debug('>>> Entering getBreadcrumb()');
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
	console.debug(`getBreadcrumb(): matched → ${matched}`);

      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
	console.debug('<<< Exiting getBreadcrumb()');
    },
    isDashboard(route) {
	console.debug(`>>> Entering isDashboard(route=${route})`);
      const name = route && route.name
      if (!name) {
		console.debug(`isDashboard(route=${route}): name → ${name}`);
        return false
      }
	console.debug(`<<< Exiting isDashboard(route=${route})`);
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
	console.debug(`>>> Entering pathCompile(path=${path})`);
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
	console.debug(`pathCompile(path=${path}): toPath → ${toPath}`);
      return toPath(params)
    },
    handleLink(item) {
	console.debug(`>>> Entering handleLink(item=${item})`);
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
	console.debug(`<<< Exiting handleLink(item=${item})`);
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

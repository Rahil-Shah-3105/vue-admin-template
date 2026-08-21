<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
	console.debug('>>> Entering routes()');
	console.debug('<<< Exiting routes()');
      return this.$router.options.routes
    },
    activeMenu() {
	console.debug('>>> Entering activeMenu()');
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
	console.debug('<<< Exiting activeMenu()');
      return path
    },
    showLogo() {
	console.debug('>>> Entering showLogo()');
	console.debug('<<< Exiting showLogo()');
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
	console.debug('>>> Entering variables()');
	console.debug('<<< Exiting variables()');
      return variables
    },
    isCollapse() {
	console.debug('>>> Entering isCollapse()');
	console.debug('<<< Exiting isCollapse()');
      return !this.sidebar.opened
    }
  }
}
</script>

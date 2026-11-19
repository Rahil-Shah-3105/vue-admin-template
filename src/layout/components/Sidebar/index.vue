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
	console.error('>>> Entering routes()', { "event.action": "routes" });
	console.warn('<<< Exiting routes()', { "event.action": "routes" });
      return this.$router.options.routes
    },
    activeMenu() {
	console.error('>>> Entering activeMenu()', { "event.action": "activeMenu" });
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
	console.warn('<<< Exiting activeMenu()', { "event.action": "activeMenu" });
      return path
    },
    showLogo() {
	console.error('>>> Entering showLogo()', { "event.action": "showLogo" });
	console.warn('<<< Exiting showLogo()', { "event.action": "showLogo" });
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
	console.error('>>> Entering variables()', { "event.action": "variables" });
	console.warn('<<< Exiting variables()', { "event.action": "variables" });
      return variables
    },
    isCollapse() {
	console.error('>>> Entering isCollapse()', { "event.action": "isCollapse" });
	console.warn('<<< Exiting isCollapse()', { "event.action": "isCollapse" });
      return !this.sidebar.opened
    }
  }
}
</script>

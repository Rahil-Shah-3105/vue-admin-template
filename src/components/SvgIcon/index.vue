<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
	console.debug('>>> Entering isExternal()');
	console.debug('<<< Exiting isExternal()');
      return isExternal(this.iconClass)
    },
    iconName() {
	console.debug('>>> Entering iconName()');
	console.debug('<<< Exiting iconName()');
      return `#icon-${this.iconClass}`
    },
    svgClass() {
	console.debug('>>> Entering svgClass()');
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
	console.debug('<<< Exiting svgClass()');
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
	console.debug('>>> Entering styleExternalIcon()');
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
	console.debug('<<< Exiting styleExternalIcon()');
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>

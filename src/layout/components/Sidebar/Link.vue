<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
	console.debug('>>> Entering isExternal()');
	console.debug('<<< Exiting isExternal()');
      return isExternal(this.to)
    },
    type() {
	console.debug('>>> Entering type()');
      if (this.isExternal) {
        return 'a'
      }
	console.debug('<<< Exiting type()');
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
	console.debug(`>>> Entering linkProps(to=${to})`);
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
	console.debug(`<<< Exiting linkProps(to=${to})`);
    }
  }
}
</script>

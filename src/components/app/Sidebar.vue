<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <li><span class="black-text sidebar-date">{{date | date('datetime')}}</span></li>
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-grey pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
export default {
  props: ['value'],
  data: () => ({
    date: new Date(),
    interval: null,
    links: [
      { title: localizeFilter('Menu_Bill'), url: '/', exact: true },
      { title: localizeFilter('Menu_History'), url: '/history' },
      { title: localizeFilter('Menu_Planning'), url: '/planning' },
      { title: localizeFilter('Menu_NewRecord'), url: '/record' },
      { title: localizeFilter('Menu_Categories'), url: '/categories' }
    ]
  }),
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true
    })
  },
  beforeDestroy() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>




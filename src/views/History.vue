<template>
  <div>
    <div class="page-title">
      <h3>{{'History_Title'|localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">
      {{'NoRecords'|localize}}.
      <router-link to="/record">{{'AddFirst'|localize}}</router-link>
    </p>

    <section class="mobileScroll" v-else>
      <HistoryTable :records="items"/>
      <div class="mobileCenter">
        <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Back' | localize"
          :next-text="'Forward' | localize"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
        />
      </div>
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'
import { Pie } from 'vue-chartjs'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    }
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categoires = await this.$store.dispatch('fetchCategories')

    this.setup(categoires)

    this.loading = false
  },
  methods: {
    setup(categoires) {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            categoryName: categoires.find(c => c.id === record.categoryId)
              .title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText:
              record.type === 'income'
                ? localizeFilter('Income')
                : localizeFilter('Outcome')
          }
        })
      )

      this.renderChart({
        labels: categoires.map(c => c.title),
        datasets: [
          {
            label: localizeFilter('CostsForCategories'),
            data: categoires.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: [
              'rgba(33, 33, 33, 0.5)',
              'rgba(66, 66, 66, 0.5)',
              'rgba(97, 97, 97, 0.5)',
              'rgba(117, 117, 117, 0.5)',
              'rgba(158, 158, 158, 0.5)',
              'rgba(189, 189, 189, 0.5)',
              'rgba(224, 224, 224, 0.5)',
            ],
            borderColor: [
              'rgba(33, 33, 33, 1)',
              'rgba(66, 66, 66, 1)',
              'rgba(97, 97, 97, 1)',
              'rgba(117, 117, 117, 1)',
              'rgba(158, 158, 158, 1)',
              'rgba(189, 189, 189, 1)',
              'rgba(224, 224, 224, 1)',
            ],
            borderWidth: 1
          }
        ]
      })
    }
  },
  components: {
    HistoryTable
  }
}
</script>


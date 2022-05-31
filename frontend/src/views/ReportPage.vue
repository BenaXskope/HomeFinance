<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { startOfYear } from 'date-fns'
import ProgressSpinner from 'primevue/progressspinner'
import InputSwitch from 'primevue/inputswitch'
import Calendar from 'primevue/calendar'
import Chart from 'primevue/chart'
import type { GraphPoints } from '@/api/statistics/graph-points'
import { getGraphPoints } from '@/api/statistics/graph-points'
import { getCategoriesWithStatsForGraph } from '@/api/categories/categories'
import type { GraphCategoriesWithStats } from '@/api/categories/categories'

const storedMonth = useStorage('month', new Date())

const timeRange = ref([startOfYear(storedMonth.value), storedMonth.value])
const isSingleMonth = ref(false)

const datesToFetch = computed(() => isSingleMonth.value ? [storedMonth.value, storedMonth.value] : [timeRange.value[0], timeRange.value[1]])

const graphStatistics = ref<GraphPoints | null>(null)

const isLoadingGraphPoints = ref(false)
const fetchGraphPoints = async() => {
  isLoadingGraphPoints.value = true
  const fetchedPoints = await getGraphPoints({ isDaily: isSingleMonth.value, startDate: datesToFetch.value[0], endDate: datesToFetch.value[1] })

  if (fetchedPoints.isRight())
    graphStatistics.value = fetchedPoints.value

  isLoadingGraphPoints.value = false
}

const lineChardData = computed(() => ({
  labels: graphStatistics.value?.dates ?? [],
  datasets: graphStatistics.value
    ? [{
      label: 'Доход',
      fill: false,
      borderColor: '#42A5F5',
      backgroundColor: '#42A5F5',
      data: graphStatistics.value.earned,
      pointRadius: isSingleMonth.value ? 0 : 3,
    }, {
      label: 'Расход',
      fill: false,
      borderColor: '#00bb7e',
      backgroundColor: '#00bb7e',
      data: graphStatistics.value.spent,
      pointRadius: isSingleMonth.value ? 0 : 3,
    }]
    : [],
}))

const lightOptions = ref({
  plugins: {
    legend: {
      labels: {
        color: '#495057',
      },
    },
  },
})

const categoriesStatistics = ref<GraphCategoriesWithStats>([])
const isLoadingCategoriesStatistics = ref(false)
const fetchCategories = async() => {
  isLoadingCategoriesStatistics.value = true

  const fetchedCategories = await getCategoriesWithStatsForGraph({ startDate: datesToFetch.value[0], endDate: datesToFetch.value[1] })
  if (fetchedCategories.isRight())
    categoriesStatistics.value = fetchedCategories.value

  isLoadingCategoriesStatistics.value = false
}

const spentChartData = computed(() => ({
  labels: categoriesStatistics.value.map(categoryStat => categoryStat.categoryTitle),
  datasets: [{
    data: categoriesStatistics.value.map(categoryStat => categoryStat.spentTotal || 12000),
    backgroundColor: categoriesStatistics.value.map(categoryStat => categoryStat.categoryColor),
  }],
}))

const earnedChartData = computed(() => ({
  labels: categoriesStatistics.value.map(categoryStat => categoryStat.categoryTitle),
  datasets: [{
    data: categoriesStatistics.value.map(categoryStat => categoryStat.earnedTotal || 12000),
    backgroundColor: categoriesStatistics.value.map(categoryStat => categoryStat.categoryColor),
  }],
}))

const donutChartOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#495057',
      },
    },
  },
}

const isLoading = computed(() => isLoadingGraphPoints.value || isLoadingCategoriesStatistics.value)
await Promise.all([fetchGraphPoints(), fetchCategories()])

watch([datesToFetch, isSingleMonth], () => {
  fetchGraphPoints()
  fetchCategories()
})

</script>
<template>
  <div>
    <h1 class="text-primary-semi-dark mb-2">
      Отчет
    </h1>
    <div class="flex flex-column lg:flex-row">
      <div class="flex align-items-center pl-3 lg:pl-1 lg:mr-2">
        <div class="mr-2">
          Данные за месяц
        </div>
        <InputSwitch v-model="isSingleMonth" />
      </div>
      <Calendar v-if="isSingleMonth" id="month" v-model="storedMonth" view="month" date-format="MM yy" :manual-input="false" show-icon class="col-10 lg:col-4" />
      <Calendar v-else id="month" v-model="timeRange" selection-mode="range" view="month" date-format="MM yy" :manual-input="false" show-icon class="col-10 lg:col-4" />
    </div>
    <ProgressSpinner v-if="isLoading" />
    <div v-else class="chart-card mb-4">
      <div class="card-header">
        Общая статистика
      </div>
      <Chart type="line" :data="lineChardData" :options="lightOptions" />
    </div>
    <div />
    <div class="flex flex-column md:flex-row justify-content-between w-full">
      <div class="chart-card mb-4 md:mb-0 md:col-6">
        <div class="card-header">
          Ваши расходы
        </div>
        <Chart type="doughnut" :data="spentChartData" :options="donutChartOptions" />
      </div>
      <div class="chart-card md:col-6">
        <div class="card-header">
          Ваши доходы
        </div>
        <Chart type="doughnut" :data="earnedChartData" :options="donutChartOptions" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import 'primeflex/primeflex.scss';
@import '@/assets/styles/main.scss';

.chart-card {
  @include styleclass('flex flex-column text-align-center border-1 border-round border-gray-400 p-2')
}
.card-header {
  @include styleclass('align-self-center text-xl font-bold mb-1 text-primary-semi-dark')
}
</style>

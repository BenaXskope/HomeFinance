<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import SelectButton from 'primevue/selectbutton'
import Calendar from 'primevue/calendar'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import { getCategoriesWithStats } from '@/api/categories/categories'
import type { CategoriesWithStats, CategoryWithStats } from '@/api/categories/categories'

const statisticsTypes = [{
  label: 'Расход',
  value: true,
},
{
  label: 'Доход',
  value: false,
}]
const selectedType = ref(true)

const month = useStorage('month', new Date())
const categories = ref<CategoriesWithStats>([])

const isLoading = ref(false)
const fetchCategories = async() => {
  isLoading.value = true

  const fetchedCategories = await getCategoriesWithStats({ month: month.value })
  if (fetchedCategories.isRight())
    categories.value = fetchedCategories.value

  isLoading.value = false
}
watch(month, fetchCategories)
await fetchCategories()

const categoryProgress = (category: CategoryWithStats) => selectedType.value ? category.spentTotal : category.earnedTotal
</script>
<template>
  <ConfirmDialog />

  <h1 class="text-primary-semi-dark mb-4">
    Планирование
  </h1>
  <Calendar id="month" v-model="month" view="month" date-format="MM yy" :manual-input="false" class="mb-4" show-icon />

  <SelectButton v-model="selectedType" :options="statisticsTypes" option-label="label" option-value="value" class="mb-4" />
  <ProgressSpinner v-if="isLoading" />
  <div class="flex flex-column">
    <router-link
      v-for="category of categories"
      :key="category.id" :to="{name: 'category-details', params: {id: category.id}, query: {isExpense: +selectedType, categoryTitle: category.title}}"
      class="no-underline text-900"
    >
      <div
        class="flex p-2 border-round mb-4 cursor-pointer hover:surface-ground align-items-center no-underline"
      >
        <div class="flex flex-grow-1 flex-column">
          <div class="flex justify-content-between mb-2">
            <div class="text-lg ">
              {{ category.title }}
            </div>
            <div>{{ categoryProgress(category) }}₽ из {{ category.prognosis }}₽</div>
          </div>
          <ProgressBar :value="categoryProgress(category)" />
        </div>
        <ChevronRightIcon class="text-3xl ml-2" />
      </div>
    </router-link>
  </div>
</template>
<style lang="scss">
@import 'primeflex/primeflex.scss';

.p-datatable {
  @include styleclass('overflow-hidden border-1 border-round border-gray-400')
}
.p-progressbar-value {
  @include styleclass('bg-primary')
}
</style>

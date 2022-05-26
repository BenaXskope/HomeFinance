<script setup lang="ts">
import { ref } from 'vue'
import ProgressBar from 'primevue/progressbar'
import SelectButton from 'primevue/selectbutton'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import { getCategories } from '@/api/categories/categories'
import type { CategoriesList } from '@/api/categories/categories'

const statisticsTypes = [{
  label: 'Расход',
  value: true,
},
{
  label: 'Доход',
  value: false,
}]
const selectedType = ref(true)

const categories = ref<CategoriesList>([])
await getCategories().then((cat) => {
  if (cat.isRight())
    categories.value = cat.value
})
</script>
<template>
  <ConfirmDialog />

  <h1 class="text-primary-semi-dark mb-4">
    Планирование
  </h1>
  <SelectButton v-model="selectedType" :options="statisticsTypes" option-label="label" option-value="value" class="mb-4" />
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
            <div>{{ category.prognosis / 2 }}₽ из {{ category.prognosis }}₽</div>
          </div>
          <ProgressBar :value="50" />
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

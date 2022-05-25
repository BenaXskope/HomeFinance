<script setup lang="ts">
import { ref } from 'vue'
import NewCategoryForm from '@components/category/NewCategoryForm.vue'
import EditCategoryForm from '@components/category/EditCategoryForm.vue'
import { getCategories } from '@/api/categories/categories'
import type { CategoriesList } from '@/api/categories/categories'

const categories = ref<CategoriesList>([])
const fetchCategories = async() => {
  const response = await getCategories()
  if (response.isRight())
    categories.value = response.value
}
await fetchCategories()
</script>
<template>
  <h1 class="text-primary-semi-dark mb-2">
    Создание и редактирование категорий
  </h1>
  <div class="flex flex-column md:flex-row justify-content-between px-1">
    <div class="flex-grow-1 md:mr-6">
      <h2 class="form-header">
        Создание
      </h2>
      <NewCategoryForm @category-created="fetchCategories" />
    </div>
    <div class="flex-grow-1 ">
      <h2 class="form-header">
        Редактирование
      </h2>
      <EditCategoryForm :categories="categories" @category-edited="fetchCategories" />
    </div>
  </div>
</template>
<style lang="scss">
@import 'primeflex/primeflex.scss';
@import '@/assets/styles/main.scss';

.form-header {
  @include styleclass('bg-primary-light py-4 border-round text-center font-normal');
}
</style>

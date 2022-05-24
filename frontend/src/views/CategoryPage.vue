<script setup lang="ts">
import NewCategoryForm from '@components/category/NewCategoryForm.vue'
import EditCategoryForm from '@components/category/EditCategoryForm.vue'

</script>
<template>
  <h1 class="text-primary-semi-dark mb-2">
    Создание и редактирование категорий
  </h1>
  <div class="flex flex-column md:flex-row justify-content-between">
    <div class="flex-grow-1 md:mr-6">
      <h2 class="form-header">
        Создание
      </h2>
      <NewCategoryForm />
    </div>
    <div class="flex-grow-1 ">
      <h2 class="form-header">
        Редактирование
      </h2>
      <EditCategoryForm />
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

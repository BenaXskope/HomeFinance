<script setup lang="ts">
import Timeline from 'primevue/timeline'
import Card from 'primevue/card'

const helpPoints = [
  {
    header: 'Категории',
    icon: 'pi pi-list',
    color: '#6070AB',
    content: 'Вы можете добавить несколько категорий трат и доходов на вкладке “Категории”. Также мы создали несколько категорий заранее',
  },
  {
    header: 'Совет',
    icon: 'pi pi-info',
    color: '#FF9800',
    content: 'Финансовый совет: заполните категорию “Непредвиденные расходы”',
  },
  {
    header: 'Новая запись',
    icon: 'pi pi-plus',
    color: '#6070AB',
    content: 'Теперь вы можете добавить новые записи о ваших расходах или доходах на вкладке “Новая запись”',
  },
  {
    header: 'Отчёт',
    icon: 'pi pi-chart-bar',
    color: '#6070AB',
    content: 'После добавления расходов и доходов вы можете просмотреть отчет использования ваших финансов на вкладке “Отчёт”',
  },
  {
    header: 'Планирование',
    icon: 'pi pi-briefcase',
    color: '#6070AB',
    content: 'На вкладке “Планирование” вы найдёте анализ расходов по категориям с учётом лимита',
  },
  {
    header: 'История',
    icon: 'pi pi-clock',
    color: '#6070AB',
    content: 'Вкладка “История” содержит историю всех ваших записей по доходам и расходам',
  },
  {
    header: 'Курс валют',
    icon: 'pi pi-dollar',
    color: '#6070AB',
    content: 'На вкладке “Курс валют” вы можете узнать актуальный курс валют и воспользоваться конвертором',
  },
]
</script>
<template>
  <h1 class="text-primary-semi-dark mb-2">
    Помощь
  </h1>
  <div class="card pb-1">
    <Timeline :value="helpPoints" align="alternate" class="customized-timeline">
      <template #marker="slotProps">
        <span class="custom-marker shadow-2" :style="{backgroundColor: slotProps.item.color}">
          <i :class="slotProps.item.icon" />
        </span>
      </template>
      <template #content="slotProps">
        <Card>
          <template #title>
            {{ slotProps.item.header }}
          </template>
          <template #subtitle>
            {{ slotProps.item.date }}
          </template>
          <template #content>
            <img v-if="slotProps.item.image" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.item.name" width="200" class="shadow-2">
            <p class="text-lg">
              {{ slotProps.item.content }}
            </p>
          </template>
        </Card>
      </template>
    </Timeline>
  </div>
</template>
<style lang="scss" scoped>
.custom-marker {
    display: flex;
    width: 2rem;
    height: 2rem;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border-radius: 50%;
    z-index: 1;
}

:deep(.p-timeline-event-content)
:deep(.p-timeline-event-opposite) {
  line-height: 1;
}

@media screen and (max-width: 960px) {
  :deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row !important;

      .p-timeline-event-content {
          text-align: left !important;
      }
    }

    .p-timeline-event-opposite {
      flex: 0;
    }

    .p-card {
      margin-top: 1rem;
    }
  }
}
</style>

<script setup lang="ts">
  import type { DataTableRowSelectEvent } from "primevue/datatable";
  import { useEventStore } from "@/stores/eventStore";
  import { inject, onMounted } from "vue";

  const store = useEventStore();
  const changeTitle = inject<Function>('changeTitle');

  const onRowSelect = (evt: DataTableRowSelectEvent): void => {
    store.mutateEventsSelect(evt.data.id, true);
  };
  const onRowUnselect = (evt: DataTableRowSelectEvent): void => {
    store.lastTableEventUnselect = evt.data.id;
    store.mutateEventsSelect(evt.data.id, false);
  };
  const classRead = (isRead: boolean): string => isRead ? 'font-normal' : 'font-semibold';
  onMounted(() => {
    changeTitle?.('Таблица');
  });
</script>

<template>
  <DataTable
    v-model:selection="store.selectedTableRows"
    :value="store.paginatedEvents"
    selectionMode="multiple"
    :metaKeySelection="false"
    tableStyle="min-width: 50rem"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
  >
    <ColumnPrime header="Дата">
      <template #body="slotProps">
        <span
          :class="classRead(slotProps.data.isRead)"
        >
          {{ slotProps.data.time }}
        </span>
      </template>
    </ColumnPrime>
    <ColumnPrime header="Важность">
      <template #body="slotProps">
        <span :class="[classRead(slotProps.data.isRead), slotProps.data.level.color]">
          <i :class="['pi', slotProps.data.level.icon]" />
          {{ slotProps.data.level.text }}
        </span>
      </template>
    </ColumnPrime>
    <ColumnPrime header="Оборудование">
      <template #body="slotProps">
        <span :class="classRead(slotProps.data.isRead)">
          {{ slotProps.data.hardware }}
        </span>
      </template>
    </ColumnPrime>
    <ColumnPrime header="Сообщение">
      <template #body="slotProps">
        <span :class="classRead(slotProps.data.isRead)">
          {{ slotProps.data.text }}
        </span>
      </template>
    </ColumnPrime>
    <ColumnPrime header="Ответственный">
      <template #body="slotProps">
        <span :class="classRead(slotProps.data.isRead)">
          {{ slotProps.data.responsible }}
        </span>
      </template>
    </ColumnPrime>
  </DataTable>
</template>

<style scoped>

</style>
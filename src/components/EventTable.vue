<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
  import { DataTableRowSelectEvent } from "primevue/datatable";
  import { useEventStore } from "@/stores/eventStore";

  const store = useEventStore();
  const lastEventUnselect = ref(null);
  const selectedRows = ref<Event[]>();

  const onRowSelect = (evt: DataTableRowSelectEvent): void => {
    store.mutateEventsSelect(evt.data.id, true);
  };
  const onRowUnselect = (evt: DataTableRowSelectEvent): void => {
    lastEventUnselect.value = evt.data.id;
    store.mutateEventsSelect(evt.data.id, false);
  };
  const classRead = (isRead: boolean): string => isRead ? 'font-normal' : 'font-semibold';
  onBeforeMount(() => {
    selectedRows.value = store.events.filter((itm) => itm.isSelected);
  });
  defineExpose({
    lastEventUnselect,
    selectedRows,
  });
</script>

<template>
  <DataTable
    v-model:selection="selectedRows"
    :value="store.paginatedEvents"
    selectionMode="multiple"
    :metaKeySelection="false"
    tableStyle="min-width: 50rem"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
  >
    <Column header="Дата">
      <template #body="slotProps">
        <span
          :class="classRead(slotProps.data.isRead)"
        >
          {{ slotProps.data.time }}
        </span>
      </template>
    </Column>
    <Column header="Важность">
      <template #body="slotProps">
        <span :class="[classRead(slotProps.data.isRead), slotProps.data.level.color]">
          <i :class="['pi', slotProps.data.level.icon]" />
          {{ slotProps.data.level.text }}
        </span>
      </template>
    </Column>
    <Column header="Оборудование">
      <template #body="slotProps">
        <span :class="classRead(slotProps.data.isRead)">
          {{ slotProps.data.hardware }}
        </span>
      </template>
    </Column>
    <Column header="Сообщение">
      <template #body="slotProps">
        <span :class="classRead(slotProps.data.isRead)">
          {{ slotProps.data.text }}
        </span>
      </template>
    </Column>
    <Column header="Ответственный">
      <template #body="slotProps">
        <span :class="classRead(slotProps.data.isRead)">
          {{ slotProps.data.responsible }}
        </span>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>

</style>
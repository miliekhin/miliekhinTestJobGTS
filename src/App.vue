<script setup lang="ts">
  import { useEventStore } from "@/stores/eventStore";
  import type { Event } from '@/types/types';
  import { RouterView, useRoute } from "vue-router";
  import { onMounted, onUnmounted, provide } from "vue";
  import type { PageState } from "primevue/paginator";
  import CommandPanel from "@/components/CommandPanel.vue";
  import {
    msMax,
    msMin,
    maxDataItems,
    PageRows,
    names,
    levels,
    messages,
    hw,
  } from "@/constances";

  const store = useEventStore();
  const route = useRoute();
  let generedItems: number = 0;

  const eventMessage = (id: number): Event => {
    const hwIdx = Math.floor(Math.random() * (hw.length + 1));
    const respIdx = Math.floor(Math.random() * names.length);
    return {
      id,
      responsible: names[respIdx],
      photoUrl: `https://randomuser.me/api/portraits/${respIdx % 2 === 0 ? '' : 'wo'}men/${respIdx}.jpg`,
      text: messages[hwIdx],
      hardware: hwIdx > (hw.length - 1) ? '' : hw[hwIdx],
      level: levels[Math.floor(Math.random() * (levels.length))],
      time: new Date().toLocaleString().replace(',', ''),
      isRead: false,
      isSelected: false,
    }
  };

  const startDataGen = (): void => {
    const randomTimeout = Math.floor(Math.random() * (msMax - msMin + 1) + msMin);
    if (maxDataItems > generedItems) {
      setTimeout(() => {
        store.mutateEventsAdd(eventMessage(generedItems));
        generedItems++;
        startDataGen();
      }, randomTimeout);
    }
  };
  onMounted(() => {
    startDataGen();
    document.addEventListener( "keydown", toggleRead);
  });
  onUnmounted(() => {
    document.removeEventListener( "keydown", toggleRead);
  });
  const toggleRead = (evt: KeyboardEvent) => {
    if (evt.code === 'Space') {
      evt.preventDefault();

      if (route.name !== 'table') {
        store.mutateEventsRead();
      } else if (store.selectedTableRows.length) {
          if (store.lastTableEventUnselect !== null) {
            store.mutateEventsSelect(store.lastTableEventUnselect, true);
          }
          store.lastTableEventUnselect = null;
          store.mutateEventsRead();
        }
      }
  };
  const showPage = (pg: PageState): void => {
    store.mutateEventsPage(pg.page);
  }
  const changeTitle = (name: string): void => {
    document.title = `Журнал событий - ${name}`
  }
  provide('changeTitle', changeTitle);
</script>

<template>
  <div
    v-if="!store.search && !store.paginatedEvents.length"
    class="text-center"
  >
    <i class="pi pi-spin pi-cog mt-8" style="font-size: 5rem"></i>
    <h2 class="text-500">Загрузка...</h2>
  </div>
  <PanelPrime
    v-else
    class="board p-0"
    header="Журнал событий"
  >
    <template #icons>
      <CommandPanel />
    </template>
    <div class="m-0">
      <RouterView />
      <PaginatorPrime
        class="mt-5"
        :rows="PageRows"
        :totalRecords="store.filteredEventsLength"
        @page="showPage"
      />
    </div>
  </PanelPrime>
</template>

<style scoped>
  .board {
    background: var(--surface-card);
    padding: 1rem;
    border-radius: 10px;
    max-width: 1400px;
    margin: 0 auto;
  }

</style>

<script setup lang="ts">
  import { useEventStore } from "@/stores/eventStore";
  import type { Event } from '@/types/types';
  import { RouterLink, RouterView } from 'vue-router'
  import { onMounted, onUnmounted, ref } from "vue";
  import EventCard from "@/components/EventCard.vue";
  import type { PageState } from "primevue/paginator";
  import EventTable from "@/components/EventTable.vue";
  import CommandPanel from "@/components/CommandPanel.vue";
  import {
    msMax,
    msMin,
    maxDataItems,
    names,
    levels,
    messages,
    hw,
  } from "@/constances";

  const store = useEventStore();
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

  const evTable = ref<InstanceType<typeof EventTable> | null>(null)
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

      if (store.currentView !== 'table') {
        store.mutateEventsRead();
      } else if (evTable.value!.lastEventUnselect !== null) {
          store.mutateEventsSelect(evTable.value!.lastEventUnselect, true);
          evTable.value!.lastEventUnselect = null;
          store.mutateEventsRead();
          evTable.value!.selectedRows = [];
        }
      }
  };

  const showPage = (pg: PageState): void => {
    store.mutateEventsPage(pg.page);
  }
</script>

<template>
<!--  <header>-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->

<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </header>-->

<!--  <RouterView />-->
  <div
    v-if="!store.search && !store.paginatedEvents.length"
    class="text-center"
  >
    <i class="pi pi-spin pi-cog mt-8" style="font-size: 5rem"></i>
    <h2 class="text-500">Загрузка...</h2>
  </div>
  <Panel
    v-else
    class="board p-0"
    header="Журнал событий"
  >
    <template #icons>
      <CommandPanel />
    </template>
    <div class="m-0">
      <div
        v-if="store.currentView === 'cards'"
        class="flex flex-initial flex-wrap"
      >
        <EventCard
          v-for="(ev, idx) in store.paginatedEvents"
          :key="idx"
          :event="ev"
        />
      </div>
      <EventTable v-else ref="evTable"/>
      <Paginator
        class="mt-5"
        :rows="9"
        :totalRecords="store.filteredEventsLength"
        @page="showPage"
      />
    </div>
  </Panel>
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

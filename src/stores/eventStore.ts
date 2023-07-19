import { ref, computed } from "vue";
import { defineStore } from 'pinia';
import type { Event } from '@/types/types';

export const useEventStore = defineStore('eventStore', () => {
  const search = ref<string>('');
  const currentView = ref<string>('cards');
  const currentPage = ref<number>(0);
  const eventsPerPage = ref<number>(9);
  const events = ref<Event[]>([]);
  const filteredEvents = computed<Event[]>(() => events.value.filter(
    (item) => item.text.includes(search.value))
  );
  const filteredEventsLength = computed<number>(() => filteredEvents.value.length);
  const paginatedEvents = computed<Event[]>(
    () => filteredEvents.value.slice(currentPage.value * eventsPerPage.value, currentPage.value * eventsPerPage.value + eventsPerPage.value)
  );
  function mutateSearch(txt: string): void {
    search.value = txt;
  }
  function mutateEventsAdd(event: Event): void {
    events.value.push(event);
  }
  function mutateEventsSelect(id: number, select: boolean): void {
    events.value[id].isSelected = select;
  }
  function mutateCurrentView(view: string): void {
    currentView.value = view;
  }
  function mutateEventsPage(page: number): void {
    currentPage.value = page;
  }
  function mutateEventsRead(): void {
    for (const evt of events.value) {
      if (evt.isSelected) {
        evt.isRead = !evt.isRead;
        evt.isSelected = false;
      }
    }
    selectedTableRows.value = [];
  }

  return {
    events,
    search,
    currentView,
    mutateEventsAdd,
    mutateEventsSelect,
    mutateEventsRead,
    paginatedEvents,
    mutateEventsPage,
    mutateCurrentView,
    mutateSearch,
    filteredEventsLength,
  };
});

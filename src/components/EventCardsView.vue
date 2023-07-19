<script setup lang="ts">
  import { useEventStore } from "@/stores/eventStore";
  import EventCard from "@/components/EventCard.vue";
  import { inject, onMounted } from "vue";

  const store = useEventStore();
  const changeTitle = inject<Function>('changeTitle');

  onMounted(() => {
    changeTitle?.('Карточки');
  });
</script>

<template>
  <div class="flex flex-initial flex-wrap">
    <EventCard
      v-for="(ev, idx) in store.paginatedEvents"
      :key="idx"
      :event="ev"
    />
  </div>
</template>

<style scoped>

</style>
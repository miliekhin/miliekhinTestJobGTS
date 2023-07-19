<script setup lang="ts">
  import { useEventStore } from "@/stores/eventStore";
  import type { PropType } from 'vue'
  import type { Event } from '@/types/types';
  import type { CardFields } from '@/types/types';

  const store = useEventStore();
  const props = defineProps({
    event: {
      type: Object as PropType<Event>,
      default: () => {},
    },
  });

  const fields: CardFields = {
    time: "Дата",
    level: "Важность",
    hardware: "Оборудование",
    text: "Сообщение",
  };
  const makeSelect = () => {
    store.mutateEventsSelect(props.event.id, !props.event.isSelected);
  };

</script>

<template>
  <div
    class="col-12 sm:col-6 lg:col-4 p-1 overflow-hidden flipup animation-duration-100"
    @click="makeSelect"
  >
    <div
      class="card flex p-2 border-2 border-round"
      :class="{'is-read': event.isRead, 'is-selected': event.isSelected}"
    >
      <table class="col-9">
        <tbody>
          <tr
            v-for="(title, key, i) in fields"
            :key="i"
          >
            <td class="p-1 font-semibold">{{title}}</td>
            <td v-if="key === 'level'">
              <span :class="['font-semibold', event[key].color]">
                <i :class="['pi', event[key].icon]" />
                {{ event[key].text }}
              </span>
            </td>
            <td v-else>{{ event[key] }}</td>
          </tr>
        </tbody>
      </table>
      <div class="col-3 p-1 text-center">
        <Avatar :image="event.photoUrl" class="shadow-5" size="xlarge" shape="circle" />
        <div class="font-semibold">{{event.responsible}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .card{
    border: 1px solid #aaa;
    box-sizing: border-box;
  }
  .card:hover{
    cursor: pointer;
  }
  .is-read{
    border: 1px solid #eee;
  }
  .is-selected{
    border: 0.15rem solid #C7D2FE;
    background: #EEF2FF;
    color: #4338CA;
  }
</style>
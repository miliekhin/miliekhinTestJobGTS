<script setup lang="ts">
  import { ref, watch } from "vue";
  import { useEventStore } from "@/stores/eventStore";
  import type { ViewValue } from "@/types/types";

  const store = useEventStore();
  const olPanel = ref();
  const searchTxt = ref<string>('');
  const viewValue = ref<ViewValue>({ icon: 'pi pi-th-large', view: 'cards' });
  const viewOptions = ref<ViewValue[]>([
                  { icon: 'pi pi-th-large', view: 'cards' },
                  { icon: 'pi pi-align-justify', view: 'table' },
              ]);
  const resetSearch = (): void => {
    store.mutateSearch('');
    searchTxt.value = '';
  };
  const toggle = (event): void => {
    olPanel.value.toggle(event);
}
  watch(viewValue, (vw) =>{
    store.mutateCurrentView(vw?.view ?? 'cards');
  });
  defineExpose({
    viewValue,
  });
</script>

<template>
  <div class="flex flex-initial">
    <SelectButton
      v-model="viewValue"
      :options="viewOptions"
      optionLabel="view"
      dataKey="view"
      aria-labelledby="custom"
    >
      <template #option="slotProps">
        <i :class="slotProps.option.icon"></i>
      </template>
    </SelectButton>
    <div
      class="p-inputgroup flex-1 ml-3"
    >
      <span class="p-inputgroup-addon">
        <i class="pi pi-search"></i>
      </span>
      <InputText
        v-model="searchTxt"
        placeholder="Найти сообщение"
        size="small"
        @input="store.mutateSearch(searchTxt)"
      />
      <Button
        icon="pi pi-times"
        size="small"
        severity="secondary"
        outlined
        title="Очистить поиск"
        @click="resetSearch"
      />
    </div>
    <Button
      class="ml-3"
      type="button"
      icon="pi pi-paperclip"
      label="Описание"
      outlined
      @click="toggle"
    />
    <OverlayPanel ref="olPanel">
      <h4>Описание</h4>
      <p class="text-lg">
        События добавляются по таймеру со случайным интервалом.<br>
        Всего 36 событий.<br>
        Данные генерируются случайно, но в них есть некоторые зависимости.
      </p>
      <p class="text-lg">
        Непрочитанные события в карточках выделены темной рамкой.<br>
        События выделяются по клику.<br>
        По нажатию на пробел, события отмечаются как прочитанные или как не прочитанные.
      </p>
      <p class="text-lg">
        Непрочитанные события в таблице выделены полужирным шрифтом.<br>
        События можно выделить по клику или пробелу.<br>
        По нажатию на пробел, события отмечаются как прочитанные или как не прочитанные.
      </p>
      <p class="text-lg">
        При переключении режима представления, состояния поиска, событий, и пагинация сохраняются.
      </p>
    </OverlayPanel>
  </div>
</template>

<style scoped>

</style>
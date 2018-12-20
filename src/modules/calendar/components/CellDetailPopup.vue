<template>
    <div>
        popup
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { CalendarEvent } from '@/models/CalendarEvent';
  import { State, Action, Getter, namespace } from 'vuex-class';

  const moduleNamespace = '$_calendar';
  const storeModule = namespace(moduleNamespace);

  @Component({
    name: 'CellDetailPopup',
  })
  export default class CellDetailPopup extends Vue {
    // @storeModule.Getter events!: CalendarEvent[];

    // currentDay!: number;
    // currentMonth!: number;
    // currentYear!: number;
    // cells!: object[];

    created() {

    }
  }
</script>

<style scoped lang="scss">

</style>
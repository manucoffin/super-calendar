<template>
    <div>
        <Calendar></Calendar>
    </div>
</template>

<script lang="ts">
  import store from './store';
  import Calendar from '@/modules/calendar/components/Calendar.vue';
  import { State, Action, Getter, namespace } from 'vuex-class';
  import Component, { mixins } from 'vue-class-component';
  import ModuleInit from '@/mixins/module-init';
  import { CalendarEvent } from '@/models/CalendarEvent';

  const moduleNamespace = '$_calendar';
  const storeModule = namespace(moduleNamespace);

  @Component({
    components: {
      Calendar,
    }
  })
  export default class CalendarContainer extends mixins(ModuleInit) {
    @storeModule.Getter events!: CalendarEvent[];
    @storeModule.Action fetchEvents!: any;

    created() {
      this.moduleNamespace = moduleNamespace;

      if (!this.isModuleRegistered()) {
        this.$store.registerModule('$_calendar', store);
      }

      this.fetchEvents();
      if (this.events.length === 0) {
      }
    }
  }
</script>

<style scoped lang="scss">

</style>

<template>
    <div>
        <!--<h1>{{ currentDay }}/{{ currentMonth }}/{{ currentYear }}</h1>-->
        <div class="calendar">
            <div v-for="cell of cells"
                 :key="cell.id"
                 class="cell"
                 @click="showDetail">
                <strong>{{ cell.id }}</strong>
                <br>
                <span v-for="event of cell.events"
                      :key="event.id"
                      class="event">
                    {{ event.label }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { CalendarEvent } from '@/models/CalendarEvent';
  import { State, Action, Getter, namespace } from 'vuex-class';

  const moduleNamespace = '$_calendar';
  const storeModule = namespace(moduleNamespace);

  @Component({
    name: 'Calendar',
  })
  export default class ArticlesList extends Vue {
    @storeModule.Getter events!: CalendarEvent[];

    currentDay!: number;
    currentMonth!: number;
    currentYear!: number;
    cells!: object[];

    created() {
      const now = new Date();
      this.currentDay = now.getDate();
      this.currentMonth = now.getMonth();
      this.currentYear = now.getUTCFullYear();

      const daysInMonth = this.daysInMonth(this.currentMonth, this.currentYear);

      this.cells = this.buildDaysArray(daysInMonth);
    }

    private showDetail() {

    }

    private buildDaysArray(daysInMonth: number): object[] {
      const daysArray = [];

      for (let i = 1; i <= daysInMonth; i++) {
        const events = this.events.filter(event => {
          const date = new Date(event.date_start);
          return date.getDate() === i && date.getMonth() === this.currentMonth;
        });

        daysArray.push({
          id: i,
          events,
        });
      }

      return daysArray;
    }

    private daysInMonth(iMonth: number, iYear: number): number {
      return 32 - new Date(iYear, iMonth, 32).getDate();
    }
  }
</script>

<style scoped lang="scss">
    .calendar {
        height: 100vh;
        display: grid;
        grid-template-columns: auto auto auto auto auto auto auto;
        grid-template-rows: auto;
        grid-column-gap: 1px;
        grid-row-gap: 1px;

        .cell {
            background: rgb(171,213,66);
            padding: 5px;
            box-sizing: border-box;

            .event {
                background: darkblue;
                color: white;
                padding: 3px;
                border-radius: 3px;
            }
        }
    }
</style>
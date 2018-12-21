<template>
    <div>
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

        <CellDetailPopup v-if="showPopup"
                         :clickedCell="clickedCell">
        </CellDetailPopup>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { CalendarEvent } from '@/models/CalendarEvent';
  import CellDetailPopup from '@/modules/calendar/components/CellDetailPopup.vue';
  import { State, Action, Getter, namespace } from 'vuex-class';
  import { Cell } from '@/models/Cell';

  const moduleNamespace = '$_calendar';
  const storeModule = namespace(moduleNamespace);

  @Component({
    name: 'Calendar',
    components: {
      CellDetailPopup,
    }
  })
  export default class ArticlesList extends Vue {
    @storeModule.Getter events!: CalendarEvent[];

    currentDay!: number;
    currentMonth!: number;
    currentYear!: number;
    showPopup = false;
    clickedCell: Cell = {x: 0, y: 0, w: 0, h: 0};

    get cells() {
      const daysInMonth = this.daysInMonth(this.currentMonth, this.currentYear);
      return this.buildDaysArray(daysInMonth);
    }

    created() {
      const now = new Date();
      this.currentDay = now.getDate();
      this.currentMonth = now.getMonth();
      this.currentYear = now.getUTCFullYear();
    }

    private showDetail(e: any) {
      const el = e.target.getBoundingClientRect();

      this.clickedCell = {
        x: el.left,
        y: el.top,
        w: el.width,
        h: el.height,
      };

      this.showPopup = true;
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
        grid-column-gap: 2px;
        grid-row-gap: 2px;
        padding: 3px;
        box-sizing: border-box;
        cursor: pointer;

        .cell {
            background: rgb(171,213,66);
            padding: 5px;
            box-sizing: border-box;
            border: solid black;
            border-color: black;

            &:nth-child(n) {
                border-width: 3px 3px 5px 5px;
                border-radius:4% 95% 6% 95%/95% 4% 92% 5%;
                transform: rotate(-2deg);
            }

            &:nth-child(2n) {
                border-width: 3px 4px 3px 5px;
                border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
                transform: rotate(2deg);
            }

            &:nth-child(3n) {
                border-width: 5px 3px 3px 5px;
                border-radius:95% 4% 97% 5%/4% 94% 3% 95%;
                transform: rotate(2deg);
            }

            &:hover {
                transform: scale(1.1);
                box-shadow: 5px 10px 0 rgba(0,0,0,.7);
                z-index: 1;
            }

            .event {
                background: darkblue;
                color: white;
                padding: 3px;
                border-radius: 3px;
            }
        }
    }
</style>
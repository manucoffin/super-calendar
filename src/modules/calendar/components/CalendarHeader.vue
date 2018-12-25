<template>
    <div class="calendar-header">
        <div class="actions">
            <button @click="changeCurrentMonth(-1)"><</button>

            <h1>
                <select v-model="displayMonth">
                    <option v-for="(month, index) of months"
                            :key="index"
                            :value="index">
                        {{ month }}
                    </option>
                </select>

                <input type="number"
                       v-model="displayYear">
            </h1>

            <button @click="changeCurrentMonth(1)">></button>
        </div>
        
        <div class="days">
            <span v-for="day of orderedDays">
                {{ day }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { State, Action, Getter, Mutation, namespace } from 'vuex-class';

  const moduleNamespace = '$_calendar';
  const storeModule = namespace(moduleNamespace);

  @Component({
    name: 'CalendarHeader',
  })
  export default class CalendarHeader extends Vue {
    @storeModule.Getter currentDay!: number;
    @storeModule.Getter currentMonth!: number;
    @storeModule.Getter currentYear!: number;
    @storeModule.Mutation setCurrentMonth!: Function;
    @storeModule.Mutation setCurrentYear!: Function;

    days: string[] = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    months: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    get displayYear() {
      return this.currentYear;
    }

    set displayYear(newVal: number) {
      this.setCurrentYear(newVal * 1);
    }

    get displayMonth() {
      return this.currentMonth;
    }

    set displayMonth(newVal) {
      this.setCurrentMonth(newVal);
    }

    get orderedDays() {
      const oDays = [...this.days];
      const firstOfMonth = new Date(this.currentYear, this.currentMonth, 1);
      const firstDay = oDays[firstOfMonth.getDay()];

      const index = oDays.findIndex(day => day === firstDay);
      const removed = oDays.splice(index);
      oDays.unshift(...removed);

      return oDays;
    }

    changeCurrentMonth(offset: number): void {
      if (this.currentMonth === 11 && offset > 0) {
        this.setCurrentMonth(0);
        this.setCurrentYear(this.currentYear + 1);
      } else if (this.currentMonth === 0 && offset < 0) {
        this.setCurrentMonth(11);
        this.setCurrentYear(this.currentYear - 1);
      } else {
        this.setCurrentMonth(this.currentMonth + offset);
      }
    }
  }
</script>

<style scoped lang="scss">
    .calendar-header {
        height: 10vh;
        padding: 3px 3px 0 3px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .actions {
            display: flex;
            justify-content: space-between;

            h1 {
                input, select {
                    font-size: 1.9rem;
                    background: none;
                    border: none;
                    font-weight: bold;

                    &:focus {
                        outline: 0;
                    }
                }

                input {
                    width: 70px;
                    text-align: right;
                }

                select {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    cursor: pointer;
                }
            }

            button {
                @include button($yellow, $yellow-light);
                font-size: 1.7rem;
                width: 3rem;

            }
        }
        
        .days {
            display: grid;
            grid-template-columns: repeat(7, 1fr);

            span {
                justify-self: center;
                font-weight: bold;
                font-size: 1.2rem;
            }
        }
    }
</style>
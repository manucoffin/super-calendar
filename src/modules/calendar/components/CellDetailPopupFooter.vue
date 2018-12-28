<template>
    <div class="footer">
        <button v-if="currentInput === 0"
                class="cancel-btn"
                @click="emitClosePopup">
            annuler
        </button>
        <button v-else
                class="cancel-btn"
                @click="emitChangeInput(currentInput - 1)">
            retour
        </button>

        <button v-if="currentInput === inputsLength"
                class="save-btn"
                @click="saveEvent">
            enregistrer
        </button>
        <button v-else
                class="save-btn"
                @click="emitChangeInput(currentInput + 1)">
            suivant
        </button>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
  import { CalendarEvent } from '@/models/CalendarEvent';
  import { State, Action, Getter, namespace } from 'vuex-class';
  import { Cell } from '@/models/Cell';
  import CellDetailPopupContent from '@/modules/calendar/components/CellDetailPopupContent.vue';
  import { EventInput } from '@/models/EventInput';

  const moduleNamespace = '$_calendar';
  const storeModule = namespace(moduleNamespace);

  @Component({
    name: 'CellDetailPopup',
    components: {
      CellDetailPopupContent,
    }
  })
  export default class CellDetailPopup extends Vue {
    @Prop({ default: () => { return new CalendarEvent() } }) selectedEvent!: CalendarEvent;
    @Prop({ default: 0 }) currentInput!: number;

    @storeModule.Getter eventToCreate!: CalendarEvent;
    @storeModule.Action updateEvent!: Function;
    @storeModule.Action createEvent!: Function;

    inputsLength: number = 2;

    @Emit('closePopup') emitClosePopup() {}
    @Emit('changeInput') emitChangeInput(val: number) {}

    saveEvent() {
      if (this.selectedEvent) {
        this.updateEvent(this.eventToCreate);
      } else {
        this.createEvent(this.eventToCreate);
      }
      this.emitChangeInput(0);
      this.emitClosePopup();
    }
  }
</script>

<style scoped lang="scss">
    .footer {
        display: flex;
        justify-content: flex-end;
        transform: rotate(-2deg);

        button {
            font-size: 1.2rem;
            background: none;
            border: none;
            cursor: pointer;

            &:focus {
                outline: 0;
            }

            &.cancel-btn {
                margin-right: 1rem;

                &:hover {
                    text-decoration: underline;
                }
            }

            &.save-btn {
                @include button($yellow, $yellow-light);
            }
        }
    }
</style>
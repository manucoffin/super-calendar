<template>
    <div class="footer">
        <button v-if="currentInput.id === 0"
                class="cancel-btn"
                @click="emitClosePopup">
            annuler
        </button>
        <button v-else
                class="cancel-btn"
                @click="changeCurrentInput(currentInput.id - 1)">
            retour
        </button>

        <button v-if="currentInput.id === inputsLength"
                :disabled="!currentInput.isValid"
                class="save-btn"
                @click="saveEvent">
            enregistrer
        </button>
        <button v-else
                class="save-btn"
                :disabled="!currentInput.isValid"
                @click="changeCurrentInput(currentInput.id + 1)">
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
  import { ICurrentInput } from '@/models/CurrentInput';

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

    @storeModule.Getter eventToCreate!: CalendarEvent;
    @storeModule.Getter currentInput!: ICurrentInput;
    @storeModule.Action updateEvent!: Function;
    @storeModule.Action createEvent!: Function;
    @storeModule.Mutation setCurrentInput!: Function;

    inputsLength: number = 2;

    @Emit('closePopup') emitClosePopup() {}

    saveEvent() {
      if (this.selectedEvent) {
        this.updateEvent(this.eventToCreate);
      } else {
        this.createEvent(this.eventToCreate);
      }
      this.changeCurrentInput(0);
      this.emitClosePopup();
    }

    changeCurrentInput(newId: number): void {
      const newCurrentInput = {
        id: newId,
        isValid: false,
      };

      this.setCurrentInput(newCurrentInput);
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
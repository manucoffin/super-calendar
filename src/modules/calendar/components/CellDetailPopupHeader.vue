<template>
    <div class="header">
        <div class="sub-header">
            <p>Je suis <span>{{ hero.name }}</span> !</p>
            <button @click="emitClosePopup">x fermer</button>
        </div>
        <p v-if="!selectedEvent">Je vais t'aider à ajouter un évènement le {{ readableDate }}.</p>
        <div v-else
             class="header-actions">
            <p>
                Veux-tu supprimer {{ selectedEvent.label }} ?
                <button @click="removeEvent">Oui, supprimer</button>
            </p>
            <p>Sinon, laisse moi t'aider à le modifier.</p>
        </div>
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
    @Prop({ default: () => { return {x: 0, y: 0, w: 0, h: 0}} }) clickedCell!: Cell;
    @Prop({ default: '' }) readableDate!: string;
    @Prop({ default: () => { return new CalendarEvent() } }) selectedEvent!: CalendarEvent;

    @storeModule.Getter heroes!: any[];
    @storeModule.Action deleteEvent!: Function;
    @storeModule.Getter currentMonth!: number;

    @Emit('closePopup') emitClosePopup() {}

    get hero() {
      return this.heroes[this.currentMonth * 31 + this.clickedCell.id - 1];
    }

    removeEvent(): void {
      this.deleteEvent(this.selectedEvent);
      this.emitClosePopup();
    }
  }
</script>

<style scoped lang="scss">
    .header {
        transform: rotate(-2deg);
        padding-bottom: 1.5rem;

        p {
            text-align: justify;
            font-size: 1.3rem;
            font-weight: bold;

            span {
                font-size: 1.5rem;
            }
        }

        .sub-header {
            display: flex;
            justify-content: space-between;

            button {
                background: none;
                border: none;
                font-weight: bold;
                font-size: 1.2rem;
                color: $red;
                cursor: pointer;
                min-width: 46px;
                margin-left: 1rem;
                align-self: baseline;

                &:hover {
                    text-decoration: underline;
                }

                &:focus {
                    outline: 0;
                }
            }
        }

        .header-actions {
            margin-top: 1rem;

            p {
                display: flex;
                justify-content: space-between;

                button {
                    @include button($yellow, $yellow-light);
                    font-size: 1.2rem;
                }
            }
        }
    }
</style>
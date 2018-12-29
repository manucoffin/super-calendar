<template>
    <form class="cell-detail-popup-content">
        <div v-for="input of inputs"
             :key="input.id"
             class="input-group">
            <template v-if="currentInput.id === input.id">
                <label>{{input.label}}</label>
                <input :placeholder="input.placeholder"
                       :type="input.type"
                       v-model="input.value"
                       @focus="applyStyle($event)"
                       @blur="applyStyle($event)"
                       :style="{background: input.value.length > 0 ? inputColor.focus : inputColor.blur}">
            </template>
        </div>
    </form>
</template>

<script lang="ts">
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
  import { CalendarEvent } from '@/models/CalendarEvent';
  import { State, Action, Getter, Mutation, namespace } from 'vuex-class';
  import { Cell, ICell } from '@/models/Cell';
  import { EventInput } from '@/models/EventInput';
  import { ICurrentInput } from '@/models/CurrentInput';

  const moduleNamespace = '$_calendar';
  const storeModule = namespace(moduleNamespace);

  @Component({
    name: 'CellDetailPopupContent',
  })
  export default class CellDetailPopupContent extends Vue {
    @Prop({ default: () => { return new Cell() } }) clickedCell!: ICell;
    @Prop({ default: () => { return new CalendarEvent() } }) selectedEvent!: CalendarEvent;

    @storeModule.Mutation updateEventToCreate!: Function;
    @storeModule.Getter events!: CalendarEvent[];
    @storeModule.Getter currentYear!: number;
    @storeModule.Getter currentMonth!: number;
    @storeModule.Getter currentInput!: ICurrentInput;

    @Watch('inputs', {deep: true})
    onInputsChanged(newVal: EventInput[], oldVal: EventInput[]) {
      const eventToCreate: CalendarEvent = {
        id: (this.selectedEvent || {}).id || this.events.length + 1,
        date_start: '',
        date_end: '',
        label: '',
        description: '',
        categories: [],
        location: '',
      };
      newVal.map((input: EventInput) => {
        let val = input.value;
        if (input.name.includes('date_')) {
          // Ici on vérifie si la date contient déjà la partie yyyy-mm-dd
          const isDate = isNaN(new Date(input.value).getUTCFullYear());
          // Si il manque cette partie (dans le cas de la création d'un event), on l'ajoute manuellement
          val = isDate ? `${this.currentYear}-${this.currentMonth + 1}-${this.clickedCell.id} ${input.value}` : input.value;
        }
        eventToCreate[input.name] = val;
      });

      this.updateEventToCreate(eventToCreate);
    }

    @Watch('clickedCell', {deep: true})
    onClickedCellChanged(newVal: ICell, oldVal: ICell) {
      this.setInputs();
    }

    created() {
      this.setInputs();
    }

    inputColor: any = {
      focus: 'rgb(247,148,31)',
      blur: 'rgb(150,150,150)',
    };
    inputs: EventInput[] = [];

    applyStyle(e: any): void {
      if (e.target.value.length > 0) return;
      e.target.style.backgroundColor = this.inputColor[e.type];
    }

    setInputs(): void {
      this.inputs = [
        {
          id: 0,
          label: 'Tout d\'abord, comment va s\'appeler ton évènement ?',
          placeholder: 'Ex : Aller voir Mary Jane au théatre',
          type: 'text',
          value: (this.selectedEvent || {}).label || 'coucou',
          name: 'label',
        },
        {
          id: 1,
          label: 'Super titre ! À quelle heure cela va-t-il commencer ?',
          placeholder: 'Ex : 20:00',
          type: 'time',
          value: (this.selectedEvent || {}).date_start || '20:00:00',
          name: 'date_start',
        },
        {
          id: 2,
          label: 'D\'accord. Toutes les bonnes choses ont une fin, quand se terminera ton évènement ?',
          placeholder: 'Ex : 22:00',
          type: 'time',
          value: (this.selectedEvent || {}).date_end || '22:00:00',
          name: 'date_end',
        },
        // {
        //   id: 3,
        //   label: 'C\'est noté. Maintenant, peux-tu m\'en dire un peu plus sur cet évènement ?',
        //   placeholder: 'Ex : blablablabla',
        //   type: 'text',
        //   value: (this.selectedEvent || {}).description || 'azeaze',
        //   name: 'description',
        // },
      ];
    }
  }
</script>

<style scoped lang="scss">
    .cell-detail-popup-content {
        transform: rotate(-2deg);
        flex-grow: 1;

        .input-group {
            display: flex;
            flex-direction: column;

            label {
                font-size: 1.3rem;
                font-weight: bold;
            }

            input {
                font-size: 1.4rem;
                margin-top: 1rem;
                border-radius: 3px;
                padding: .3rem 1rem;
                border: solid black;
                border-width: 2px 3px 2px 4px;
                border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
                color: white;
                text-shadow: -1px 1px 0 black;
                background: rgb(247, 148, 31);
                font-weight: bold;

                &:focus {
                    outline: 0;
                }

                &::placeholder { /* Chrome/Opera/Safari */
                    color: white;
                    text-shadow: none;
                    font-weight: bold;
                }
            }
        }
    }
</style>
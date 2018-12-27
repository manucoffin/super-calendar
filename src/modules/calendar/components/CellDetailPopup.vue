<template>
    <div class="container"
         :class="[popupSide, {'bottom-half': bottomHalf}]"
         :style="{left: cssPosition.x, top: cssPosition.y}">
        <div class="header">
            <div>
                <p>Je suis <span>{{ hero.name }}</span> !</p>
                <button @click="emitClosePopup">x fermer</button>
            </div>
            <p>Je vais t'aider à ajouter un évènement le {{ readableDate }}.</p>
        </div>

        <CellDetailPopupContent :current-input="currentInput"
                                :clickedCell="clickedCell">
        </CellDetailPopupContent>

        <div class="footer">
            <button v-if="currentInput === 0"
                    class="cancel-btn"
                    @click="emitClosePopup">
                annuler
            </button>
            <button v-else
                    class="cancel-btn"
                    @click="changeCurrentInput(-1)">
                retour
            </button>

            <button v-if="currentInput === inputsLength"
                    class="save-btn"
                    @click="saveEvent">
                enregistrer
            </button>
            <button v-else
                    class="save-btn"
                    @click="changeCurrentInput(+1)">
                suivant
            </button>
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
    @Prop({ default: ''}) readableDate!: string;

    @storeModule.Getter heroes!: any[];
    @storeModule.Getter currentMonth!: number;
    @storeModule.Getter eventToCreate!: CalendarEvent;
    @storeModule.Action createEvent!: Function;

    popupWidth: number = 300;
    popupHeight: number = 300;
    popupPadding: number = 30;
    popupSide: string = 'left';
    bottomHalf: boolean = false;
    currentInput: number = 0;
    inputsLength: number = 5;

    @Emit('closePopup') emitClosePopup() {}

    get hero() {
      return this.heroes[this.currentMonth * 31 + this.clickedCell.id - 1]
    }

    get cssPosition() {
      let offsetX = this.clickedCell.w;
      let offsetY = 0;

      if (this.clickedCell.x > window.innerWidth / 2) {
        this.popupSide = 'left';
        offsetX = -(this.popupWidth + this.popupPadding);
      } else {
        this.popupSide = 'right';
      }

      if (this.clickedCell.y > window.innerHeight - this.popupHeight) {
        offsetY = -this.popupHeight + this.clickedCell.h / 2;
        this.bottomHalf = true;
      } else {
        this.bottomHalf = false;
      }

      return {
        x: `${this.clickedCell.x + offsetX}px`,
        y: `${this.clickedCell.y + offsetY}px`,
      }
    }

    changeCurrentInput(offset: number) {
      this.currentInput += offset;
    }

    saveEvent() {
      this.createEvent(this.eventToCreate);
    }
  }
</script>

<style scoped lang="scss">
    .container {
        @include shadow();
        position: absolute;
        border: solid black;
        background: white;
        border-width: 3px 4px 3px 5px;
        border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
        transform: rotate(2deg);
        width: 300px;
        height: 300px;
        padding: 15px;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &.right {
            &:before {
                content: "";
                width: 0px;
                height: 0px;
                position: absolute;
                border-left: 10px solid transparent;
                border-right: 10px solid black;
                border-top: 10px solid black;
                border-bottom: 10px solid transparent;
                left: -20px;
                top: 30px;
            }

            &:after {
                content: "";
                width: 0px;
                height: 0px;
                position: absolute;
                border-left: 7px solid transparent;
                border-right: 7px solid #fff;
                border-top: 7px solid #fff;
                border-bottom: 7px solid transparent;
                left: -10px;
                top: 33px;
            }

            &.bottom-half {
                &:before {
                    top: 280px;
                    left: -15px;
                }

                &:after {
                    top: 283px;
                    left: -7px;
                }
            }
        }

        &.left {
            &:before {
                content: "";
                width: 0px;
                height: 0px;
                position: absolute;
                border-left: 10px solid black;
                border-right: 10px solid transparent;
                border-top: 10px solid black;
                border-bottom: 10px solid transparent;
                right: -17px;
                top: 30px;
            }

            &:after {
                content: "";
                width: 0px;
                height: 0px;
                position: absolute;
                border-left: 7px solid #fff;
                border-right: 7px solid transparent;
                border-top: 7px solid #fff;
                border-bottom: 7px solid transparent;
                right: -9px;
                top: 33px;
            }

            &.bottom-half {
                &:before {
                    top: 280px;
                    right: -21px;
                }

                &:after {
                    top: 283px;
                    right: -11px;
                }
            }
        }

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

            &>div {
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
        }

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
    }
</style>
<template>
    <div class="container"
         :class="[popupSide, {'bottom-half': bottomHalf}]"
         :style="{left: cssPosition.x, top: cssPosition.y}">

        <CellDetailPopupHeader :readableDate="readableDate"
                               :clickedCell="clickedCell"
                               :selectedEvent="selectedEvent"
                               @closePopup="emitClosePopup">
        </CellDetailPopupHeader>

        <CellDetailPopupContent :selectedEvent="selectedEvent"
                                :clickedCell="clickedCell"
                                @closePopup="emitClosePopup">
        </CellDetailPopupContent>

        <CellDetailPopupFooter @closePopup="emitClosePopup"
                               :selectedEvent="selectedEvent">
        </CellDetailPopupFooter>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
  import { CalendarEvent } from '@/models/CalendarEvent';
  import { State, Action, Getter, Mutation, namespace } from 'vuex-class';
  import { Cell, ICell } from '@/models/Cell';
  import CellDetailPopupContent from '@/modules/calendar/components/CellDetailPopupContent.vue';
  import CellDetailPopupHeader from '@/modules/calendar/components/CellDetailPopupHeader.vue';
  import CellDetailPopupFooter from '@/modules/calendar/components/CellDetailPopupFooter.vue';
  import { EventInput } from '@/models/EventInput';
  import { ICurrentInput } from '@/models/CurrentInput';

  const moduleNamespace = '$_calendar';
  const storeModule = namespace(moduleNamespace);

  @Component({
    name: 'CellDetailPopup',
    components: {
      CellDetailPopupContent,
      CellDetailPopupHeader,
      CellDetailPopupFooter,
    }
  })
  export default class CellDetailPopup extends Vue {
    @Prop({ default: () => { return new Cell() } }) clickedCell!: ICell;
    @Prop({ default: '' }) readableDate!: string;
    @Prop({ default: () => { return new CalendarEvent() } }) selectedEvent!: CalendarEvent;

    @storeModule.Getter currentInput!: ICurrentInput;

    popupWidth: number = 300;
    popupHeight: number = 300;
    popupPadding: number = 30;
    popupSide: string = 'left';
    bottomHalf: boolean = false;

    @Emit('closePopup') emitClosePopup() {}

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
    }
</style>
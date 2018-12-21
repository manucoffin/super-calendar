<template>
    <div class="container"
         :class="popupSide"
         :style="{left: cssPosition.x, top: cssPosition.y}">
        Did someone say <em>chimichangas?</em>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { CalendarEvent } from '@/models/CalendarEvent';
  import { State, Action, Getter, namespace } from 'vuex-class';
  import { Cell } from '@/models/Cell';

  const moduleNamespace = '$_calendar';
  const storeModule = namespace(moduleNamespace);

  @Component({
    name: 'CellDetailPopup',
  })
  export default class CellDetailPopup extends Vue {
    @Prop({ default: {x: 0, y: 0, w: 0, h: 0} }) clickedCell!: Cell;
    popupWidth: number = 300;
    popupPadding: number = 30;
    popupSide: string = 'left';

    get cssPosition() {
      let offset = this.clickedCell.w;

      if (this.clickedCell.x > window.innerWidth / 2) {
        this.popupSide = 'left';
        offset = -(this.popupWidth + this.popupPadding);
      } else {
        this.popupSide = 'right';
      }

      return {
        x: `${this.clickedCell.x + offset}px`,
        y: `${this.clickedCell.y}px`,
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
        }
    }
</style>
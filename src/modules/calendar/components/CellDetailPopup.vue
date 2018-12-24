<template>
    <div class="container"
         :class="[popupSide, {'bottom-half': bottomHalf}]"
         :style="{left: cssPosition.x, top: cssPosition.y}">
        <div class="header">
            <h3>{{ readableDate }}</h3>
            <button @click="sendCloseEvent">X Fermer</button>
        </div>

        <CellDetailPopupContent></CellDetailPopupContent>

        <div class="footer">
            <button class="cancel-btn">annuler</button>
            <button class="save-btn">enregistrer</button>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { CalendarEvent } from '@/models/CalendarEvent';
  import { State, Action, Getter, namespace } from 'vuex-class';
  import { Cell } from '@/models/Cell';
  import CellDetailPopupContent from '@/modules/calendar/components/CellDetailPopupContent.vue';

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
    popupWidth: number = 300;
    popupHeight: number = 300;
    popupPadding: number = 30;
    popupSide: string = 'left';
    bottomHalf: boolean = false;

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

    sendCloseEvent() {
      this.$emit('closePopup');
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
            display: flex;
            justify-content: space-between;
            transform: rotate(-2deg);
            padding-bottom: .5rem;
            border-bottom: 2px dashed rgb(100,100,100);


            h3 {
                font-size: 1.4rem;
            }

            button {
                background: none;
                border: none;
                font-weight: bold;
                font-size: 1.2rem;
                color: $red;
                cursor: pointer;
                
                &:hover {
                    text-decoration: underline;
                }

                &:focus {
                    outline: 0;
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
                    background: $yellow;
                    border-radius: 3px;
                    padding: 2px 5px;
                    border: solid black;
                    border-width: 2px 3px 2px 4px;
                    border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
                    position: relative;

                    &:before {
                        content: '';
                        display: block;
                        background: rgba(255,255,255,.3);
                        width: 95%;
                        height: 6px;
                        border-radius: 5px;
                        position: absolute;
                        transform: rotate(-1deg);
                        left: 0;
                        top: 0;
                    }

                    &:after {
                        content: '';
                        display: block;
                        background: rgba(255,255,255,.3);
                        width: 4px;
                        height: 75%;
                        border-radius: 0 0 5px 5px;
                        position: absolute;
                        transform: rotate(-3deg);
                        left: 0;
                        top: 6px;
                    }

                    &:hover {
                        background: $yellow-light;
                    }
                }
            }
        }
    }
</style>
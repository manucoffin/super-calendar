<template>
    <form class="cell-detail-popup-content">
        <legend>
            {{ popupMod === 'add' ? 'Ajouter' : 'Modifier' }} un évènement
        </legend>


        <div class="input-group">
            <label>Titre de l'évènement</label>
            <input type="text">
        </div>

        <div class="input-group">
            <label>De</label>
            <input type="time">
        </div>

        <div class="input-group">
            <label>À</label>
            <input type="time">
        </div>

        <div class="input-group">
            <label>Description</label>
            <input type="time">
        </div>

        Catégories
    </form>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { CalendarEvent } from '@/models/CalendarEvent';
  import { State, Action, Getter, namespace } from 'vuex-class';
  import { Cell } from '@/models/Cell';

  const moduleNamespace = '$_calendar';
  const storeModule = namespace(moduleNamespace);

  @Component({
    name: 'CellDetailPopupContent',
  })
  export default class CellDetailPopupContent extends Vue {
    // @Prop({ default: {x: 0, y: 0, w: 0, h: 0} }) clickedCell!: Cell;
    popupMod: string = 'add';
  }
</script>

<style scoped lang="scss">
    .cell-detail-popup-content {
        transform: rotate(-2deg);
        flex-grow: 1;


    }
</style>
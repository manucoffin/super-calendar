import Vue from 'vue';
import Component from 'vue-class-component';

// You can declare a mixin as the same style as components.
@Component
export default class ModuleInit extends Vue {
  public moduleNamespace!: string;

  isModuleRegistered() {
    let isRegistered = false;
    const getters = Object.keys(this.$store.getters);
    getters.map(getter => {
      if (getter.includes(this.moduleNamespace)) {
        isRegistered = true;
      }
    });

    return isRegistered;
  }
}

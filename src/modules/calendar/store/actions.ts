import axios from 'axios';
import { CalendarEvent } from '@/models/CalendarEvent';
import { ActionTree } from 'vuex';
import { CalendarEventState } from '@/models/CalendarEventState';
import { RootState } from '@/store/type';

const actions: ActionTree<CalendarEventState, RootState> = {
  async fetchEvents({ commit }): Promise<any> {
    try {
      const response = await axios.get(process.env.VUE_APP_API_URL +  '/events');
      const payload: CalendarEvent[] = response && response.data.events;
      commit('eventsLoaded', payload);
    } catch (error) {
      commit('eventsError');
    }
  },

  async fetchHeroes({ commit }): Promise<any> {
    try {
      const localStoredHeores = localStorage.getItem('heroes') || '';
      let payload: any[];

      if (localStoredHeores.length === 0) {
        commit('setFetchingHeroes', true);

        let allHeroes: any[] = [];
        let loadingHeroesPromises = [];
        for (let i = 0; i < 10; i++) {
          loadingHeroesPromises.push(load100Heroes(i * 100, allHeroes));
        }

        await Promise.all(loadingHeroesPromises);

        commit('setFetchingHeroes', false);

        payload = allHeroes;
        if (payload) {
          localStorage.setItem('heroes', JSON.stringify(payload));
        }
      } else {
        payload = JSON.parse(localStoredHeores);
      }

      commit('heroesLoaded', payload);
    } catch (error) {
      commit('heroesError');
    }
  },
};

function getOnlyHeroesWithThumbnail(heroes: any): any[] {
  return heroes.filter((hero: any) => !hero.thumbnail.path.includes('image_not_available'));
}

async function load100Heroes(offset: number, allHeroes: any[]) {
  try {
    const params = `limit=100&offset=${offset}`;
    const url = `${process.env.VUE_APP_MARVEL_API_URL}/public/characters?${params}&apikey=${process.env.VUE_APP_MARVEL_API_PUBLIC_KEY}`;
    const response = await axios.get(url);

    const heroesWithThumbnail = getOnlyHeroesWithThumbnail(response.data.data.results);
    allHeroes.push(...heroesWithThumbnail);
  } catch (error) {
    console.log('error', error);
  }
}

export default actions;

import api from './api';

export async function addFavorite(id: number) {
    try {
      await api.post(`/favorito`, { evento_id:id });
      return true;
    } catch (e) {
      return false;
    }
  }

  export async function removeFavorite(id: number) {
    try {
        await api.delete(`/favorito/${ id }`);
        return true;
      } catch (e) {
        return false;
      }
  }
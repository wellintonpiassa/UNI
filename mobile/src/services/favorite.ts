import type { Event } from '../services/event';

import api from './api';

export async function addFavorite(id: number) {
  try {
    await api.post('/favorito', { evento_id: id });
    return true;
  } catch (e) {
    return false;
  }
}

export async function removeFavorite(id: number) {
  try {
    await api.delete(`/favorito/${id}`);
    return true;
  } catch (e) {
    return false;
  }
}

export async function listFavorites(): Promise<Event[]> {
  try {
    const { data } = await api.get('/favorito');
    return data.eventList.map((event: any) => ({
      address: event.endereco,
      city: event.cidade,
      description: event.descricao_do_evento,
      endDate: event.datafim,
      id: event.idevento,
      imageURL: event.url_imagem_banner,
      name: event.nome,
      price: event.preco_ingresso,
      startDate: event.datainicio,
      tickets: event.n_tickets,
      userId: event.usuario_id,
    }));
  } catch (e) {
    return [];
  }
}

import api from './api';

export interface Event {
  address: string;
  city: string;
  description: string;
  end_date: string;
  id: string;
  image: string;
  name: string;
  price: string;
  start_date: string;
  tickets: string;
  userId: string;
}

interface ListEventsOptions {
  page?: number;
}

export async function listEvents(options: ListEventsOptions): Promise<Event[]> {
  let url = '/evento';
  if (options.page) {
    url += `?pagina=${options.page}`;
  }
  try {
    const { data } = await api.get(url);
    return data.eventList.map((event: any) => ({
      address: event.endereco,
      city: event.cidade,
      description: event.descricao_do_evento,
      end_date: event.datafim,
      id: event.idevento,
      image: event.url_imagem_banner,
      name: event.nome,
      price: event.preco_ingresso,
      start_date: event.datainicio,
      tickets: event.n_tickets,
      userId: event.usuario_id,
    }));
  } catch (e) {
    return [];
  }
}

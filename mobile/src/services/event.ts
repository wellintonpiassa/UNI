import api from './api';

export interface Event {
  address: string;
  city: string;
  description: string;
  endDate: string;
  id: string;
  imageURL: string;
  name: string;
  price: number;
  startDate: string;
  tickets: number;
  userId: string;
}

interface ListEventsOptions {
  page?: number;
  filterByDate?: boolean;
  filterByCity?: string;
}

export async function listEvents(options: ListEventsOptions): Promise<Event[]> {
  let url = `/evento?pagina=${options.page}&proximos30d=${
    options.filterByDate ? 1 : 0
  }`;
  if (options.filterByCity) {
    url += `&cidade=${encodeURIComponent(options.filterByCity.toLowerCase())}`;
  }
  try {
    const { data } = await api.get(url);
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

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import api from './api';

interface EventBase {
  address: string;
  city: string;
  description: string;
  endDateTime: Date;
  imageURL: string;
  name: string;
  price: string;
  startDateTime: Date;
  tickets: string;
}

interface CreateEvent extends EventBase {
  email: string;
}

export interface Event extends CreateEvent {
  id: number;
  isFavorite: boolean;
  userId: number;
}

interface ListEventsOptions {
  page?: number;
}

interface ListEventsOptions {
  page?: number;
  filterByDate?: boolean;
  filterByCity?: string;
}

export async function listEvents(options: ListEventsOptions): Promise<Event[]> {
  let url = `/evento?pagina=${options.page ?? 1}&proximos30d=${
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

export async function createEvent(event: CreateEvent): Promise<boolean> {
  try {
    const { data } = await api.post('/evento', {
      endereco: event.address,
      cidade: event.city,
      descricao_do_evento: event.description,
      data_fim: format(event.endDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", {
        locale: ptBR,
      }),
      url_imagem_banner: event.imageURL,
      nome: event.name,
      preco_ingresso: event.price,
      data_inicio: format(event.startDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", {
        locale: ptBR,
      }),
      n_tickets: event.tickets,
      email_organizador: event.email,
    });
    return data.created;
  } catch (e) {
    return false;
  }
}

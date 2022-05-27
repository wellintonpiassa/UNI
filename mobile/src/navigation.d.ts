import type { Routes } from './routes/routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends Routes {}
  }
}

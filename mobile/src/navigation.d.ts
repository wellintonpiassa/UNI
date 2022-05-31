import type { IRoutes } from './routes/routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends IRoutes {}
  }
}

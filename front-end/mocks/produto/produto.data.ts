import { dataService, IBackendService } from 'web-backend-api';
import { collectionName, PRODUTO_MOCK } from './produto.mock';

dataService(collectionName, (dbService: IBackendService) => {

  PRODUTO_MOCK.forEach((produto) => dbService.storeData(collectionName, produto));
});

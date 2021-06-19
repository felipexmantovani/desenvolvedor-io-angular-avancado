import { dataService, IBackendService } from 'web-backend-api';
import { collectionName, FORNECEDOR_MOCK } from './fornecedor.mock';

dataService(collectionName, (dbService: IBackendService) => {

  FORNECEDOR_MOCK.forEach((fornecedor) => dbService.storeData(collectionName, fornecedor));
});

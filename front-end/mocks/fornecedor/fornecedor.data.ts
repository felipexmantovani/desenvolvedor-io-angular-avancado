import { dataService, IBackendService } from 'web-backend-api';
import { collectionName, fornecedores } from './fornecedor.mock';

dataService(collectionName, (dbService: IBackendService) => {

  fornecedores.forEach((fornecedor) => dbService.storeData(collectionName, fornecedor));
});

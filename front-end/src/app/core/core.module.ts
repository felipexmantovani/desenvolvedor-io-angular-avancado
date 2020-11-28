import { NgModule } from '@angular/core';
import { LoadingModule } from './modules/loading/loading.module';
import { CoreServiceModule } from './services/core-services.module';

@NgModule({
  imports: [
    CoreServiceModule,
    LoadingModule
  ],
  exports: [CoreServiceModule, LoadingModule]
})
export class CoreModule {}

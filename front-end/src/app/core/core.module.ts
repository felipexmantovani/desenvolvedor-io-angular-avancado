import { NgModule } from '@angular/core';
import { PoLoadingModule } from '@po-ui/ng-components';
import { CoreServiceModule } from './services/core-services.module';

@NgModule({
  imports: [
    CoreServiceModule,
    PoLoadingModule
  ],
  exports: [PoLoadingModule]
})
export class CoreModule {}

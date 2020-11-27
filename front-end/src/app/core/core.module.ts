import { NgModule } from '@angular/core';
import { CoreServiceModule } from './services/core-services.module';

@NgModule({
  imports: [
    CoreServiceModule
  ],
  exports: [CoreServiceModule]
})
export class CoreModule {}

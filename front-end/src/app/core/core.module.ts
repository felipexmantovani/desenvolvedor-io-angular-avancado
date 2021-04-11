import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpCustomInterceptorModule } from './modules/http-custom-interceptor/http-custom-interceptor.module';
import { IbgeModule } from './modules/ibge/ibge.module';
import { LoadingModule } from './modules/loading/loading.module';
import { ViaCepModule } from './modules/via-cep/via-cep.module';
import { CoreServiceModule } from './services/core-services.module';

@NgModule({
  imports: [
    HttpClientModule,
    HttpCustomInterceptorModule,
    CoreServiceModule,
    LoadingModule,
    ViaCepModule,
    IbgeModule
  ],
  exports: [LoadingModule]
})
export class CoreModule {}

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpCustomInterceptorModule } from './modules/http-custom-interceptor/http-custom-interceptor.module';
import { IbgeModule } from './modules/ibge/ibge.module';
import { LoadingModule } from './modules/loading/loading.module';
import { ViaCepModule } from './modules/via-cep/via-cep.module';

@NgModule({
  imports: [
    HttpClientModule,
    HttpCustomInterceptorModule,
    LoadingModule,
    ViaCepModule,
    IbgeModule
  ],
  exports: [LoadingModule]
})
export class CoreModule {}

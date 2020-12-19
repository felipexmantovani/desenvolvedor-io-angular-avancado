import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpCustomInterceptor } from './http-custom-interceptor.service';

@NgModule({
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCustomInterceptor,
    },
  ],
})
export class HttpCustomInterceptorModule {}

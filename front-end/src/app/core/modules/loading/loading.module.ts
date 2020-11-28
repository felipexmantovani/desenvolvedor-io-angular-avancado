import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoLoadingModule } from '@po-ui/ng-components';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule, PoLoadingModule],
  exports: [LoadingComponent],
  providers: [LoadingService],
})
export class LoadingModule {}

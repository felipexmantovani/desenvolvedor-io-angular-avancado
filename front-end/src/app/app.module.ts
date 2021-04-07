import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutComponentsModule } from './modules/layout/components/layout-component.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutComponentsModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

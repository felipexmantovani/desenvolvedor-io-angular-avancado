import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BackendConfigArgs, setupBackend } from 'web-backend-api';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

declare const require: any;

const context = require.context('../mocks/', true, /\.data\.ts$/);
context.keys().map(context);

const config: BackendConfigArgs = {
  delay: 2000,
  host: 'localhost',
  apiBase: 'api/v1',
  passThruUnknownUrl: true,
  jsonParseWithDate: true,
  pageEncapsulation: false
};
setupBackend(config, {dbtype: 'indexdb'}).then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule).then(
    () => {
      console.log('[Backend]', 'Backend database application started!');
    }
  ).catch(err => console.error(err));
}).catch(err => console.error(err));

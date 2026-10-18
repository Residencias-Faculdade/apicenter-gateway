import { bootstrapApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { GatewayList } from './app/gateway-list/gateway-list';
import { appConfig } from './app/app.config';
bootstrapApplication(GatewayList, appConfig).then((appRef) => {
  const gatewayElement = createCustomElement(GatewayList, {
    injector: appRef.injector as any,
  });

  customElements.define('apicenter-gateway-list', gatewayElement);

  console.log('✅ Web Component <apicenter-gateway-list> registrado!');
});

import { Location, LocationStrategy } from '@angular/common'
import { NgModule } from '@angular/core'
import { getLocation } from './angular-web-cached-view.service'

@NgModule({})
export class WebCachedModule {
  static forRoot() {
    return {
      ngModule: WebCachedModule,
      providers: [
        {
          provide: Location,
          useFactory: getLocation,
          deps: [ LocationStrategy ]
        }
      ]
    }
  }
}
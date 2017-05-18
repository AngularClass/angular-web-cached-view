import { Location, LocationStrategy } from '@angular/common'
import { NgModule, Injectable } from '@angular/core'

export const GOOGLE_WEBCACHE_URL = /(.+)(q=cache:(https?:\/\/)?(.+?)\/)(.*?)(&.+|$|\+&.+|\+)/;
export const GOOGLE_WEBCACHE = /webcache/;

export function createOriginUrl(url: string) {
  const _url = url.replace(/^\//, '');
  const originUrl = location.pathname + location.search;
  return originUrl.replace(GOOGLE_WEBCACHE_URL, '$1$2' + _url + '$6');
}

export function getPath (url: string) {
  return url
     .replace(/%3A/g, ':')
     .replace(/%2F/g, '/')
     .replace(GOOGLE_WEBCACHE_URL, '/$5');
}

@Injectable()
export class WebCacheLocation extends Location {
  _platformStrategy: LocationStrategy;
  constructor(platformStrategy: LocationStrategy) {
    super(platformStrategy);
  }

  normalize(url: string) {
    const _url = getPath(url);
    return super.normalize(_url);
  }

  go(path: string, query: string = ''): void {
    const url = createOriginUrl(path);
    this._platformStrategy.pushState(null, '', url, query);
  }

  replaceState(path: string, query: string = ''): void {
    const url = createOriginUrl(path);
    this._platformStrategy.replaceState(null, '', url, query);
  }

}

export function getLocation(platformStrategy: any) {
  const host = location.host;
  if (GOOGLE_WEBCACHE.test(host)) {
    return new WebCacheLocation(platformStrategy);
  }
  return new Location(platformStrategy);
}

function webCacheUrl(url: string) {
   if (!GOOGLE_WEBCACHE.test(url)) { return url; }
   return getPath(url);
 }

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
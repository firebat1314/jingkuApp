import { Injectable } from '@angular/core';

import { Platform } from 'ionic-angular';
import ImgCache from 'imgcache.js';
/*
  Generated class for the ImgcacheProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ImgcacheProvider {

  public imgQueue: string[] = [];

  constructor(platform: Platform) {
    ImgCache.options.debug = true;
  }

  /**
   * Init imgCache library
   * @return {Promise}
   */
  public initImgCache(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (ImgCache.ready) {
        resolve();
      } else {
        ImgCache.init(() => resolve(), () => reject());
      }
    });
  }

  /**
   * Cache images
   * @param src {string} - img source
   */
  public cacheImg(src: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ImgCache.isCached(src, (path: string, success: boolean) => {
        // if not, it will be cached
        if (success) {
          ImgCache.getCachedFileURL(src,
            (originalUrl, cacheUrl) => {
              resolve(cacheUrl);
            },
            (e) => {
              reject(e)
            });
        } else {
          // cache img
          ImgCache.cacheFile(src);
          // return original img URL
          resolve(src);
        }
      });
    });
  }
  isCached(src): Promise<boolean> {
    return new Promise((resolve, reject) => {
      ImgCache.isCached(src, (path: string, success: boolean) => {
        resolve(success);
      });
    });
  }
}

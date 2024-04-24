import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IframeService } from './shared/services/iframe/iframe.service';
import { StyleManager } from './shared/services/style-manager/style-manager.service';
import { ApiService } from './shared/services/api/api.service';
declare var GoogleTranslate: Function;
export let globalShareBaseOrigin: string;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  // _iframeService: any;
  // styleManager: any;
  // _cdf: any;
  @HostListener('document:mousemove')
  @HostListener('document:click')
  @HostListener('document:keydown')
  resetIdleTimeout() {
    this.sendMessage({ is_idle_active: false }, this.baseOrigin);
  }
  constructor(
    private _iframeService: IframeService,
    private styleManager: StyleManager,
    private _cdf: ChangeDetectorRef,
    private _apiService: ApiService
  ) {
    this.baseOrigin = window.location.ancestorOrigins[0];
    this.baseOrigin = window.location.ancestorOrigins[0];
    globalShareBaseOrigin = this.baseOrigin;
  }

  // baseOrigin: string = 'http://u3.getster.tech';
  baseOrigin!: string;
  isLoaded: boolean = false;

  ngOnInit() {
    this._iframeService.getIframeData.subscribe({
      next: (next: any) => {
        if (next) {
          this.styleManager.toggleDarkTheme(next.dark ?? false);
          setTimeout(() => {
            GoogleTranslate(next.googleTranslate);
          }, 1000);
        }
      },
    });
  }
  ngAfterViewInit(): void {
    this.iframeLoaded();
  }

  ngOnDestroy() {
    sessionStorage.clear();
  }

  iframeLoaded() {
    window.addEventListener('message', (e) => {
      if (e.origin == this.baseOrigin) {
        let parentData = JSON.parse(JSON.parse(JSON.stringify(e.data)));
              let parser = JSON.parse(e?.data);
        for (const key in parentData) {
          // console.log(key, 'sdf');
          if (Object.prototype.hasOwnProperty.call(parentData, key)) {
            const value = parentData[key];
            sessionStorage.setItem(key, value);
          }
        }
        this.isLoaded = true;
        // this._iframeService.sendIframeData(parentData);
        this._cdf.detectChanges();
        // this.sendMessage('Received From Child', e.origin);
      }
    });

    // Send data to parent message first time
    window.addEventListener('load', (e) => {
      this.sendMessage('Connected Successful.', this.baseOrigin);
      this._cdf.detectChanges();
    });
  }
  sendMessage(body: any, targetOrigin: string) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(JSON.stringify(body), targetOrigin);
  }
}

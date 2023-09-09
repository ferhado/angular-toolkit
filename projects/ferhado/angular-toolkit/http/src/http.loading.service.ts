import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FatHttpLoadingService {
  private activeRequests: Record<string, number> = {};
  readonly loadingSubject = new BehaviorSubject<Record<string, boolean>>({});

  startLoading(loadingTag: string) {
    if (!this.activeRequests[loadingTag]) {
      this.activeRequests[loadingTag] = 0;
    }

    this.activeRequests[loadingTag]++;
    this.next();
  }

  stopLoading(loadingTag: string) {
    if (this.activeRequests[loadingTag]) {
      this.activeRequests[loadingTag]--;

      if (this.activeRequests[loadingTag] === 0) {
        delete this.activeRequests[loadingTag];
      }

      this.next();
    }
  }

  private next() {
    const loadingState: Record<string, boolean> = {};
    for (const tag in this.activeRequests) {
      loadingState[tag] = this.activeRequests[tag] > 0;
    }
    this.loadingSubject.next(loadingState);
  }
}

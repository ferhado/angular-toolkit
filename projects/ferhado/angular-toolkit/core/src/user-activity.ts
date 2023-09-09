import { ApplicationRef, Injectable } from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FatUserActivity {
  private STORATE_KEY = 'fat.lastUserActivity';
  private inactivityTimer!: Subscription;
  private timeoutNotifierSubject$ = new Subject<void>();
  private timeout!: number;

  constructor(private appRef: ApplicationRef) {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.checkInactivity();
      }
    });
  }

  timeoutNotifier(timeout: number): Observable<void> {
    this.timeout = timeout * 60000;
    this.appRef.isStable.pipe(filter((stable) => stable)).subscribe(() => {
      this.resetInactivityTimer(this.timeout);
    });

    return this.timeoutNotifierSubject$.asObservable();
  }

  private resetInactivityTimer(timeout: number): void {
    const now = new Date().getTime();
    localStorage.setItem(this.STORATE_KEY, now.toString());

    if (this.inactivityTimer) {
      this.inactivityTimer.unsubscribe();
    }

    this.inactivityTimer = timer(timeout)
      .pipe(take(1))
      .subscribe(() => this.timeoutNotifierSubject$.next());
  }

  private checkInactivity(): void {
    const lastActivity = Number(localStorage.getItem(this.STORATE_KEY));
    const now = new Date().getTime();

    if (now - lastActivity >= this.timeout) {
      this.timeoutNotifierSubject$.next();
    } else {
      this.resetInactivityTimer(this.timeout - (now - lastActivity));
    }
  }
}

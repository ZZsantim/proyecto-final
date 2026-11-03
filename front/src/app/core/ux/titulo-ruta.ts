import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslatedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private latestSnapshot: RouterStateSnapshot | null = null;

  constructor() {
    super();
    this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.latestSnapshot) {
        this.updateTitle(this.latestSnapshot);
      }
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.latestSnapshot = snapshot;
    const titleKey = this.buildTitle(snapshot);
    const translatedAppName = this.translate.instant('app.name');
    const appName = translatedAppName === 'app.name' ? 'Electrostock' : translatedAppName;
    const translatedTitle = titleKey ? this.translate.instant(titleKey) : appName;

    this.title.setTitle(translatedTitle === titleKey ? appName : `${translatedTitle} · ${appName}`);
  }
}

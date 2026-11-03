import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  Input,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import type { PortalPageContext } from '../portal/portal-page';

@Component({
  imports: [FormsModule, RouterLink, TranslatePipe],
  selector: 'app-mechanic-pages',
  templateUrl: './mecanico.html',
})
export class MechanicPagesComponent implements AfterViewInit {
  @Input({ required: true }) page!: PortalPageContext;

  private readonly injector = inject(Injector);
  private readonly confirmationDialog = viewChild<ElementRef<HTMLElement>>('confirmationDialog');

  ngAfterViewInit(): void {
    effect(
      () => {
        const isOpen = this.page.pendingTransition() !== null;
        const dialog = this.confirmationDialog()?.nativeElement;
        if (isOpen && dialog) {
          requestAnimationFrame(() => dialog.focus());
        }
      },
      { injector: this.injector },
    );
  }
}

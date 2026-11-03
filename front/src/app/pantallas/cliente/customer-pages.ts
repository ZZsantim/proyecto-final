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
  selector: 'app-customer-pages',
  templateUrl: './cliente.html',
})
export class CustomerPagesComponent implements AfterViewInit {
  @Input({ required: true }) page!: PortalPageContext;

  private readonly injector = inject(Injector);
  private readonly confirmationDialog = viewChild<ElementRef<HTMLElement>>('confirmationDialog');
  private readonly bookingConfirmation = viewChild<ElementRef<HTMLElement>>('bookingConfirmation');

  ngAfterViewInit(): void {
    effect(
      () => {
        const isOpen =
          this.page.confirmCancelId() !== null ||
          this.page.pendingRescheduleId() !== null ||
          this.page.timerExpired();
        const dialog = this.confirmationDialog()?.nativeElement;
        if (isOpen && dialog) {
          requestAnimationFrame(() => dialog.focus());
        }
      },
      { injector: this.injector },
    );
    effect(
      () => {
        if (this.page.bookingConfirmed()) {
          requestAnimationFrame(() => this.bookingConfirmation()?.nativeElement.focus());
        }
      },
      { injector: this.injector },
    );
  }
}

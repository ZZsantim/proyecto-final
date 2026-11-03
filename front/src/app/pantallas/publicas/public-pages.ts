import { Component, ElementRef, Input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import type { PortalPageContext } from '../portal/portal-page';

@Component({
  imports: [FormsModule, RouterLink, TranslatePipe],
  selector: 'app-public-pages',
  templateUrl: './publicas.html',
})
export class PublicPagesComponent {
  @Input({ required: true }) page!: PortalPageContext;

  private readonly emailField = viewChild<ElementRef<HTMLInputElement>>('emailField');

  protected signIn(): void {
    this.page.signIn();
    if (this.page.formError) {
      requestAnimationFrame(() => this.emailField()?.nativeElement.focus());
    }
  }
}

import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import type { PortalPageContext } from '../portal/portal-page';

@Component({
  imports: [FormsModule, TranslatePipe],
  selector: 'app-admin-pages',
  templateUrl: './administracion.html',
})
export class AdminPagesComponent {
  @Input({ required: true }) page!: PortalPageContext;
}

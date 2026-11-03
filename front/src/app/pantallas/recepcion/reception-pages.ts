import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import type { PortalPageContext } from '../portal/portal-page';

@Component({
  imports: [FormsModule, RouterLink, TranslatePipe],
  selector: 'app-reception-pages',
  templateUrl: './recepcion.html',
})
export class ReceptionPagesComponent {
  @Input({ required: true }) page!: PortalPageContext;
}

import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { PortalPageComponent } from './portal-page';

describe('PortalPageComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PortalPageComponent],
      providers: [provideRouter([]), provideTranslateService({ fallbackLang: 'es', lang: 'es' })],
    });
  });

  it('creates the portal shell', () => {
    const fixture = TestBed.createComponent(PortalPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

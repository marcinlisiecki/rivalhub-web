import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderLinkComponent } from './header/header-link/header-link.component';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../app.module';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HeaderComponent, HeaderLinkComponent],
  exports: [HeaderComponent, HeaderLinkComponent],
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
    NgOptimizedImage,
    ToastModule,
    MenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class LayoutModule {}

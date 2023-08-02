import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderLinkComponent } from './header/header-link/header-link.component';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [HeaderComponent, HeaderLinkComponent],
  exports: [HeaderComponent, HeaderLinkComponent],
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
    NgOptimizedImage,
    MenuModule,
  ],
})
export class LayoutModule {}

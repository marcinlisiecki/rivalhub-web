import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderLinkComponent } from './header/header-link/header-link.component';

@NgModule({
  declarations: [HeaderComponent, HeaderLinkComponent],
  exports: [HeaderComponent, HeaderLinkComponent],
  imports: [CommonModule, RouterLinkActive, RouterLink, NgOptimizedImage],
})
export class LayoutModule {}

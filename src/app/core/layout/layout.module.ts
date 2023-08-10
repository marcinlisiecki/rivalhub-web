import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderLinkComponent } from './header/header-link/header-link.component';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from "primeng/button";
import {SharedModule} from "@app/shared/shared.module";
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarSectionComponent } from './sidebar/sidebar-section/sidebar-section.component';
import { SectionItemComponent } from './sidebar/section-item/section-item.component';
import { SidebarModule } from 'primeng/sidebar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { HeaderLoggedInComponent } from './header/header-logged-in/header-logged-in.component';
import { HeaderNotLoggedInComponent } from './header/header-not-logged-in/header-not-logged-in.component';
import { LanguageButtonComponent } from './header/language-button/language-button.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [HeaderComponent, HeaderLinkComponent,SidebarComponent,
    SidebarSectionComponent,
    SectionItemComponent,
    HeaderLoggedInComponent,
    HeaderNotLoggedInComponent,
    LanguageButtonComponent,],
  exports: [HeaderComponent, HeaderLinkComponent,SidebarComponent,
    SidebarModule,
    ToggleButtonModule,],
  imports: [
    BrowserModule,
    CommonModule,
    RouterLinkActive,
    RouterLink,
    NgOptimizedImage,
    MenuModule,
    ToastModule,
    HttpClientModule,
    ButtonModule,
    SharedModule,
    SidebarModule,
    ToggleButtonModule,
    TranslateModule,
  ],
})
export class LayoutModule {}

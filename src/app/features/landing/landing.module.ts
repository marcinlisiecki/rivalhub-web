import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeroComponent } from '@app/features/landing/hero/hero.component';
import { RivalhubComponent } from '@app/features/landing/hero/rivalhub/rivalhub.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeroComponent, RivalhubComponent],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    SharedModule,
    ProgressSpinnerModule,
    NgOptimizedImage,
  ],
  exports: [HeroComponent, RivalhubComponent],
})
export class LandingModule {}

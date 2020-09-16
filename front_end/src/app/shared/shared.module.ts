import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgrounAnimationComponent } from './backgroun-animation/backgroun-animation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

const materialModules = [
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatTabsModule,
  MatDividerModule,
  MatExpansionModule
];

@NgModule({
  declarations: [BackgrounAnimationComponent],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    BackgrounAnimationComponent,
    ...materialModules
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class SharedModule { }

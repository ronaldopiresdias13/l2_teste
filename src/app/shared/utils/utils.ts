import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      MatDialogModule,
      MatProgressSpinnerModule,
      LoadingSpinnerComponent
    ],
   exports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
   ],
   // entryComponents: [LoadingSpinnerComponent],

})
export class Utils { }

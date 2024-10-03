import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { TableModule } from 'primeng/table';
import { TransactionsListRoutingModule } from './categories-list-routing.module';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { categoriesReducer } from 'src/app/store/reducer/category.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from 'src/app/store/effects/category.effect';

@NgModule({
    declarations: [CategoriesListComponent],
    imports: [
        TransactionsListRoutingModule,
        CommonModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        StoreModule.forFeature('categories', categoriesReducer),
        EffectsModule.forFeature([CategoriesEffects]),
    ],
    bootstrap: [CategoriesListComponent],
    providers: [MessageService],
})
export class CategoriesListModule {}

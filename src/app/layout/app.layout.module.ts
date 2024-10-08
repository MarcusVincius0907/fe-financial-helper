import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppLayoutComponent } from './app.layout.component';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { transactionReducer } from '../store/reducer/transaction.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TransactionsEffects } from '../store/effects/transaction.effect';
import { ToastModule } from 'primeng/toast';
import { categoriesReducer } from '../store/reducer/category.reducer';
import { CategoriesEffects } from '../store/effects/category.effect';
import { DatepickertrangeComponent } from '../components/shared/datepickertrange/datepickertrange.component';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
        DatepickertrangeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        ToastModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        CalendarModule,
        OverlayPanelModule,
        InputGroupModule,
        InputGroupAddonModule,
        ButtonModule,
        InputTextModule,
        ChipsModule,
        CommonModule,
        CalendarModule,
        FormsModule,
        StoreModule.forFeature('categories', categoriesReducer),
        StoreModule.forFeature('transactions', transactionReducer),
        EffectsModule.forFeature([TransactionsEffects, CategoriesEffects]),
    ],
    exports: [AppLayoutComponent],
})
export class AppLayoutModule {}

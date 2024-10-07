import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { StoreModule } from '@ngrx/store';
import { chartReducer } from 'src/app/store/reducer/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChartsEffects } from 'src/app/store/effects/dashboard.effect';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        ProgressBarModule,
        StoreModule.forFeature('dashboard', chartReducer),
        EffectsModule.forFeature([ChartsEffects]),

    ],
    declarations: [DashboardComponent],
    providers:[DatePipe]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import {
    HashLocationStrategy,
    LocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        MessageService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

import { LocalStorageService } from './../service/local-storage.service.ts.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Store } from '@ngrx/store';
import { requestTransactions, syncTransactions } from '../store/actions/transaction.action';
import { requestCategories } from '../store/actions/category.action';
import { requestCharts } from '../store/actions/dashboard.action';
import { localStorageKey } from '../constans';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    date1: Date[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private store$: Store, private localStorageService: LocalStorageService, private router: Router) { }

    ngOnInit(){
        this.store$.dispatch(requestTransactions())
        this.store$.dispatch(requestCategories())
    }

    public syncTransactions(){
        this.store$.dispatch(syncTransactions())
    }

    public onLogout(){
        this.localStorageService.removeItem(localStorageKey.JWT_TOKEN)
        this.router.navigate(['/auth/login'])
    }

}

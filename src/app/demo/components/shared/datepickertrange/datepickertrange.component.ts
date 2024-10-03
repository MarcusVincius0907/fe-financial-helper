import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'datepickertrange',
  standalone: true,
  imports: [OverlayPanelModule, InputGroupModule, InputGroupAddonModule, ButtonModule, InputTextModule, ChipsModule, CommonModule, CalendarModule, FormsModule ],
  templateUrl: './datepickertrange.component.html',
  styleUrl: './datepickertrange.component.scss'
})
export class DatepickertrangeComponent {

    date1: any;

    public onSelectRange() {

        console.log(this.date1)

    }
}

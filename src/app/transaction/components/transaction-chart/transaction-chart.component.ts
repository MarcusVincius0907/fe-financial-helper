import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { TransactionService } from '../../services/transaction.service';
import { Subscription } from 'rxjs';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss']
})
export class TransactionChartComponent implements OnInit, OnDestroy {

  public chartOptions: ChartOptions;
  private subscription = new Subscription();

  constructor(
    private route: Router,
    private transactionService: TransactionService
  ) {
    this.chartOptions = {
      series: [12,50],
      chart: {
        type: "donut",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
   }

  ngOnInit(): void {
    this.subscription.add(
      this.transactionService.getTransactionChart().subscribe(response => {
        if(response?.data){
          this.chartOptions.series = response.data.series.map(serie => serie.amount)
          this.chartOptions.labels = response.data.labels
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public goBack() {
    this.route.navigate(['list-transactions']);
  }

}

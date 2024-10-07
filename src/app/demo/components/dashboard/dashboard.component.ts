import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Store } from '@ngrx/store';
import { requestCharts } from 'src/app/store/actions/dashboard.action';
import { getCharts } from 'src/app/store/selectors/dashboard.selector';
import { BudgetChart, CategoryItem, TrasactionChart } from 'src/models/Transaction';
import { DatePipe } from '@angular/common';
import { getCategories } from 'src/app/store/selectors/category.selector';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    tableData!: any;
    chartData: any;
    chartOptions: any;
    charts: TrasactionChart;
    pieData: any;
    pieOptions: any;
    budgetByCategory: BudgetChart[];
    categories: CategoryItem[] = []

    private subscriptions = new Subscription();

    constructor(private store$: Store, private datePipe: DatePipe) {}

    ngOnInit() {
        this.subscriptions.add(
            this.store$.select(getCharts).subscribe((charts) => {
                if (charts) {
                    this.charts = charts;
                    this.buildCategoryChart(this.charts?.categoryChart);
                    this.buildCurrentMonthExpenseChart(
                        this.charts.currentMonthExpense
                    );
                    this.budgetByCategory = this.charts.budgetByCategory;
                    this.tableData = this.charts.lastBoughtItems.map(item => ({...item, category: this.categories.find(category => category._id === item.categoryId)?.text || 'default'}))
                }
            })
        );

        this.subscriptions.add(
            this.store$.select(getCategories).subscribe(categories => {
                if(categories) this.categories = categories;
            })
        )
    }


    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }

    private buildCategoryChart(arr: { label: string; data: number }[]) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        this.pieData = {
            labels: arr.map((item) => item.label),
            datasets: [
                {
                    data: arr.map((item) => item.data),
                    backgroundColor: [
                        '#6366f1',
                        '#7a6df3',
                        '#906ef5',
                        '#a56ff6',
                        '#a855f7',
                        '#a65bda',
                        '#a361bc',
                        '#9e68a0',
                        '#608f93',
                        '#14b8a6',
                    ],
                },
            ],
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor,
                    },
                },
            },
        };
    }

    private buildCurrentMonthExpenseChart(arr: { label: string; data: number }[]) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: arr.map((item) => this.formatDate(item.label)),
            datasets: [
                {
                    label: 'Dataset',
                    data: arr.map((item) => item.data),
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }


    private formatDate(date: Date | string) {
        // Use the transform method of DatePipe to format the date
        return this.datePipe.transform(date, 'dd/MM');
    }
}

import { createSelector } from '@ngrx/store';
import { ChartsState, getChartsState } from '../reducer/dashboard.reducer';

export const getCharts = createSelector(
    getChartsState,
    (state: ChartsState) => state.charts
);



import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { TrasactionChart } from 'src/models/Transaction';
import {
    requestCharts,
    requestChartsError,
    requestChartsSuccess,
} from '../actions/dashboard.action';

export const getChartsState = createFeatureSelector<ChartsState>('dashboard');

export interface ChartsState {
    charts: TrasactionChart;
    loading: boolean;
}

const chartsInitialState: ChartsState = {
    charts: null,
    loading: false,
};

const reducer = createReducer(
    chartsInitialState,

    //get charts
    on(requestCharts, (state: ChartsState): ChartsState => {
        return { ...state, loading: true };
    }),

    on(requestChartsSuccess, (state: ChartsState, action): ChartsState => {
        return { ...state, charts: action.charts, loading: false };
    }),

    on(requestChartsError, (state: ChartsState): ChartsState => {
        return { ...state, loading: false };
    })
);

export function chartReducer(
    state: ChartsState | undefined,
    action: Action
): ChartsState {
    return reducer(state, action);
}

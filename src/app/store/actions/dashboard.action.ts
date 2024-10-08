import { createAction, props } from "@ngrx/store";
import { TrasactionChart } from "src/app/models/Transaction";

//Get charts
export const requestCharts = createAction(
  'Request Charts',
);

export const requestChartsSuccess = createAction(
  'Request Charts Success',
  props<{ charts: TrasactionChart }>()
);

export const requestChartsError = createAction(
  'Request Charts Error',
  props<{ error: string }>()
);

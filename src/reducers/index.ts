import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import throttle from "lodash/throttle";
import orgReducer from "../org/reducers/org.reducer";
import formReducer from "../org/reducers/forms.reducer";
import { OrgState, OrgNodeFormState, FormState } from "../org/types/org.types";
import { saveState, loadState } from "./local-storage";
import orgNodeFormReducer from "../org/reducers/org-node-form.reducer";

const orgViewReducer = combineReducers<{
  orgReducer: OrgState;
  orgNodeFormReducer: OrgNodeFormState;
  formReducer: FormState;
}>({
  orgReducer,
  orgNodeFormReducer,
  formReducer
});

const persistedState = loadState();
export const store = createStore(
  orgViewReducer,
  persistedState,
  applyMiddleware(logger)
);

store.subscribe(
  throttle(() => {
    saveState({ orgReducer: store.getState().orgReducer });
  }, 1000)
);

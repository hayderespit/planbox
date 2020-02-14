import { call, put, all } from 'redux-saga/effects';
import * as actions from '../actions';
import {
  getInitiatives,
  getItems,
  getProjects,
  getUsers
} from '../../../api/initiative';
import { getTasks } from '../../../api/item';

export function* fetchGetInitiatives({ payload }) {
  try {
    yield put(actions.getInitiativesRequest());
    const { data } = yield call(getInitiatives);
    yield put(actions.getInitiativesSuccess(data));
  } catch (error) {
    const {
      status,
      data: { message }
    } = error;
    yield put(actions.getInitiativesFailure({ code: status, message }));
  }
}

export function* fetchGetCurrentItems({ payload }) {
  try {
    yield put(actions.getCurrentItemsRequest());

    const { id, ...rest } = payload;
    const filter = new URLSearchParams({
      timeframe: 'current',
      ...rest
    }).toString();

    const results = yield call(getItems, id, filter);

    yield put(actions.getCurrentItemsSuccess(results));
  } catch (error) {
    const {
      status,
      data: { message }
    } = error;
    yield put(actions.getCurrentItemsFailure({ code: status, message }));
  }
}

export function* fetchGetNextItems({ payload }) {
  try {
    yield put(actions.getNextItemsRequest());

    const { id, ...rest } = payload;
    const filter = new URLSearchParams({
      timeframe: 'next',
      ...rest
    }).toString();

    const results = yield call(getItems, id, filter);

    yield put(actions.getNextItemsSuccess(results));
  } catch (error) {
    const {
      status,
      data: { message }
    } = error;
    yield put(actions.getNextItemsFailure({ code: status, message }));
  }
}

export function* fetchGetBacklogItems({ payload }) {
  try {
    yield put(actions.getBacklogItemsRequest());

    const { id, ...rest } = payload;
    const filter = new URLSearchParams({
      timeframe: 'backlog',
      ...rest
    }).toString();

    const results = yield call(getItems, id, filter);

    yield put(actions.getBacklogItemsSuccess(results));
  } catch (error) {
    const {
      status,
      data: { message }
    } = error;
    yield put(actions.getBacklogItemsFailure({ code: status, message }));
  }
}

export function* fetchGetUtils({ initiative }) {
  try {
    yield put(actions.getUtilsRequest);

    let projectsList = {};
    let usersList = {};
    const { data: projects } = yield call(getProjects, initiative);
    const { included: users } = yield call(getUsers, initiative);

    projects.forEach(({ id, alias }) => {
      projectsList[`${id}`] = `${alias}`;
    });

    users.forEach(({ id, image }) => {
      if (image) usersList[`${id}`] = `${image}`;
    });

    yield put(
      actions.getUtilsSuccess({ projects, projectsList, users, usersList })
    );
  } catch (error) {
    const {
      status,
      data: { message }
    } = error;
    yield put(actions.getUtilFailure({ code: status, message }));
  }
}

export function* fetchGetTasks({ payload }) {
  try {
    const { initiative, rest } = payload;

    const filter = new URLSearchParams({
      ...rest
    }).toString();

    yield put(actions.getTasksRequest);
    const result = yield call(getTasks, initiative, filter);
    yield put(actions.getTasksSuccess(result));
  } catch (error) {
    const {
      status,
      data: { message }
    } = error;
    yield put(actions.getItemsFailure({ code: status, message }));
  }
}

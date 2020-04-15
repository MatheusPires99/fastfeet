import { Alert } from "react-native";
import { takeLatest, call, put, all } from "redux-saga/effects";

import api from "~/services/api";

import { singInSuccess, signFailure } from "./actions";

export function* singIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, "deliverymans/sessions", {
      id,
    });

    const { token, deliveryman } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(singInSuccess(token, deliveryman));

    // history.push("/orders");
  } catch (err) {
    Alert.alert("Erro no login", "ID de cadastro inválido");
    yield put(signFailure());
  }
}

function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push("/");
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", singIn),
  takeLatest("@auth/SIGN_OUT", signOut),
]);

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

    if (deliveryman.provider) {
      Alert.alert(
        "Erro no login",
        "O usuário não pode ser prestador de serviços"
      );
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(singInSuccess(token, deliveryman));

    // history.push("/dashboard");
  } catch (err) {
    Alert.alert(
      "Falha na autenticação",
      "Houve um erro no login, verifique seus dados"
    );
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

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", singIn),
]);

import { store } from "./store";

function authToken() {
    if (store.getState().auth.access_token) {
        return store.getState().auth.access_token;
    }
    return null;
}

export default authToken;
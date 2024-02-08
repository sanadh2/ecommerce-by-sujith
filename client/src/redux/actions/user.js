import axios from "axios";
import { server } from "../../server";
import { loadUserFailed, loadUserReq, loadUserSuccess } from "../reducers/user";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserReq());
    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    if (error.response) dispatch(loadUserFailed(error.response.data.message));
    else dispatch(loadUserFailed(error.message));
  }
};

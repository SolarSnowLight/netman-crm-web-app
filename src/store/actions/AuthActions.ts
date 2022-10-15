import { AppDispatch } from "../store";
import axios from "axios";
import { authSlice } from "../reducers/AuthSlice";
import IAuthResponse from "../../models/users/auth/IAuthResponse";
import MainApi from "../../constants/api/main/main.api";
import AuthApi from "../../constants/api/main/auth.api";
import useHttp from "../../hooks/http";

export const authSignIn = (data: any) => async(dispatch: AppDispatch) => {
    try{
        dispatch(authSlice.actions.signIn());
        const response = await axios.post<IAuthResponse>(MainApi.MAIN_SERVER + AuthApi.LOGIN, data);
        dispatch(authSlice.actions.signInSuccess(response.data));

        console.log(response.data);
    }catch(e){
        dispatch(authSlice.actions.signInError((e as Error).message));
    }
};

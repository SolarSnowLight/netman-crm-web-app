/* Libraries */
import { v4 as uuidv4 } from "uuid";

/* Context */
import { messageQueueSlice } from "../reducers/MessageQueueSlice";
import { AppDispatch } from "../store";

/* Models */
import { IMessage } from "src/models/message/IMessage";
import { IResponseMessage } from "src/models/message/IResponseMessage";
import { AxiosError } from "axios";

const addMessage =
  (
    response: IResponseMessage | null | undefined,
    type: string | null | undefined,
    message: string | null | undefined
  ) =>
  async (dispatch: AppDispatch) => {
    if (response || message) {
      const msg: IMessage = {
        uuid: uuidv4(),
        data: {
          message: message ? message : response?.message,
        },
        status: response ? response.status : 200,
        type: type,
        created_at: new Date(),
      };

      dispatch(messageQueueSlice.actions.addMessage(msg));
    }
  };

const removeMessage = (uuid: string) => async (dispatch: AppDispatch) => {
  dispatch(messageQueueSlice.actions.removeMessage(uuid));
};

const errorMessage = (e: Error) => async (dispatch: AppDispatch) => {
  if (e instanceof AxiosError) {
    const msg: IMessage = {
      uuid: uuidv4(),
      data: {
        message: e.response?.data.message,
      },
      status: e.response ? e.response.status : 200,
      type: "error",
      created_at: new Date(),
    };

    dispatch(messageQueueSlice.actions.addMessage(msg));
  } else {
    const msg: IMessage = {
      uuid: uuidv4(),
      data: {
        message: e.message,
      },
      status: 400,
      type: "error",
      created_at: new Date(),
    };

    dispatch(messageQueueSlice.actions.addMessage(msg));
  }
};

const messageQueueAction = {
  removeMessage,
  addMessage,
  errorMessage,
};

export default messageQueueAction;

import { useReducer } from "react";
import saasApi from "../api/saas";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "loading_finish":
      return { ...state, file: action.file, loading: false };
    case "loading":
      return { ...state, loading: true };
    case "reset":
      return { ...state, file: null, loading: false };
    default:
      return state;
  }
};

export const useFileHandler = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const reset = () => {
    dispatch({ type: "reset" });
  };

  const onChange = async (e) => {
    e.persist();
    if (e.target.files.length) {
      // replace
      const fileType = e.target.files[0].name.split(".")[1];
      const fileName = e.target.files[0].name
        .replace(".jpg", ".jpeg")
        .split(".")[0];

      // get presignedUrl
      const res = await saasApi.post("/media/aws/image", {
        fileName,
        fileType,
      });

      dispatch({ type: "loading" });

      if (res.data) {
        const { photoPresignedUrl, photoTargetUrl } = res.data;

        await axios.put(photoPresignedUrl, e.target.files[0], {
          headers: {
            "Content-Type": fileType,
          },
        });

        dispatch({ type: "loading_finish", file: photoTargetUrl });
      } else {
        dispatch({ type: "loading_finish", file: fileName });
      }
    }
  };

  return {
    ...state,
    onChange,
    reset,
  };
};

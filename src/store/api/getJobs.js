import axios from "axios";

export const formatData = async (data, speciffic) => {
  let value = data[speciffic];
  return value;
};

export const getData = async (state, dispatch, dispatchType, stateName) => {
  if (state[stateName].length === 0) {
    let res = await axios.get(`./data.json`, {
      headers: {
        "content-type": "application/json",
      },
    });
    let json = res.data;

    dispatch({
      type: dispatchType,
      payload: json,
    });
  }
};
  
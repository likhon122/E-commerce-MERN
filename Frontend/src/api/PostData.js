import axiosApiFetch from "./apiConfig";

const postData = async (endPoint, info) => {
  try {
    const response = await axiosApiFetch.post(endPoint, { info });
    return {
      data: response.data,
      isSuccess: true,
      isError: false,
      error: null,
      isLoading: false
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      isSuccess: false,
      isError: true,
      error: error.response.data.message,
      isLoading: false
    };
  }
};

export default postData;

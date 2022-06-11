import client from "./client";

//show post
export const getPosts = async (pageNo, limit) => {
  try {
    const { data } = await client(
      `/post/posts?pageNo=${pageNo}&limit=${limit}`,
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return {
      error: error.message || error,
    };
  }
};

//delete post
export const deletePost = async (postId) => {
  try {
    const { data } = await client.delete(`/post/${postId}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return {
      error: error.message || error,
    };
  }
};

export const searchPost = async (keyss) => {
  try {
    const { data } = await client(`/post/search?title=${keyss}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return {
      error: error.message || error,
    };
  }
};

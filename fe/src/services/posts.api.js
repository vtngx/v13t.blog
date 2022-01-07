import axios from 'axios';

const HOST = 'http://localhost:3001/api';

export const listPosts = async (tag) => {
  try {
    let query = '';
    if (tag) query += `?tag=${tag}`

    const res = await axios.get(`${HOST}/posts${query}`);
    return res.data.data.data
  } catch (err) {
    return err;
  }
}

export const getPost = async (id) => {
  try {
    const res = await axios.get(`${HOST}/posts/${id}`);
    return res.data.data;
  } catch (err) {
    return err;
  }
}

export const createPost = async (body) => {
  try {
    const res = await axios.post(`${HOST}/posts`, body);
    return res.data.data;
  } catch (err) {
    return err;
  }
}

export const updatePost = async (id, body) => {
  try {
    const res = await axios.put(`${HOST}/posts/${id}`, { ...body });
    return res.data.data;
  } catch (err) {
    return err;
  }
}

export const deletePost = async (id) => {
  try {
    return await axios.delete(`${HOST}/posts/${id}`);
  } catch (err) {
    return err;
  }
}
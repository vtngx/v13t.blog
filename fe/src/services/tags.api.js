import axios from 'axios';

const HOST = 'http://localhost:3001/api';

export const listTags = async () => {
  try {
    const res = await axios.get(`${HOST}/tags`)
    return res.data.data
  } catch (err) {
    return err
  }
}

export const getTag = async (id) => {
  try {
    const res = await axios.get(`${HOST}/tags/${id}`)
    return res.data.data
  } catch (err) {
    return err
  }
}

export const createTag = async (body) => {
  try {
    const res = await axios.post(`${HOST}/tags`, body);
    return res.data.data;
  } catch (err) {
    return err;
  }
}

export const deleteTag = async (id) => {
  try {
    const res = await axios.delete(`${HOST}/tags/${id}`);
    return res.data.data;
  } catch (err) {
    return err;
  }
}
import axios from 'axios';

const HOST = 'http://localhost:3001/api';

export const uploadFile = async (formData) => {
  try {
    const res = await axios.post(`${HOST}/files/upload`, formData)
    return `${HOST}/files/${res.data.data.data}`
  } catch (err) {
    return err
  }
}
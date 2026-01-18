import api from './api';

const generateUploadUrl = async (key: string, contentType?: string) => {
  // const url = `http://localhost:8080/api/uploads/generate-upload-url?key=${key}${contentType ? `&contentType=${encodeURIComponent(contentType)}` : ''}`;
  const response = await api.get(`/uploads/generate-upload-url?key=${key}${contentType ? `&contentType=${encodeURIComponent(contentType)}` : ''}`)
  console.log(response);
  return response.data; // Use .text() instead of .json() since backend returns a plain string
};

const deleteImages = async (keys: string[]) => {
  const response = await api.delete('/uploads/delete-images', { data: { keys } });
  return response.data;
};

export {generateUploadUrl, deleteImages};
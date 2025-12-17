const generateUploadUrl = async (key: string, contentType?: string) => {
  const url = `http://localhost:3001/api/uploads/generate-upload-url?key=${key}${contentType ? `&contentType=${encodeURIComponent(contentType)}` : ''}`;
  const response = await fetch(url);
  return response.text(); // Use .text() instead of .json() since backend returns a plain string
};

export {generateUploadUrl};
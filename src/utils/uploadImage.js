import axios from "axios";

const imageKey = import.meta.env.VITE_IMGBB_API_KEY;

export const uploadImage = async (imageFile) => {
  if (!imageFile) return null;

  const formData = new FormData();

  formData.append("image", imageFile);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${imageKey}`,
    formData
  );

//   console.log(data);
  return data.data.url;
};
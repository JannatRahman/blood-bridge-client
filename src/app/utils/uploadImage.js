import toast from 'react-hot-toast';

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  // console.log(data);

  if (data.success) {
    return data.data.url;
  }

  toast.error('Image upload failed');
};
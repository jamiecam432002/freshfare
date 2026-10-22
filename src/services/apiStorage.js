import supabase from "./supabase";

const BUCKET = "freshfare-images";

export async function uploadProductImage(file) {
  const extensions = {
    "image/webp": "webp",
    "image/png": "png",
    "image/jpeg": "jpg",
  };

  const extension = extensions[file.type];

  if (!extension) {
    throw new Error("unsupported image format");
  }

  const fileName = `${crypto.randomUUID()}.${extension}`;
  const filePath = `products/${fileName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data.path;
}

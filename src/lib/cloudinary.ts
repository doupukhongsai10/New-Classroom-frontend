import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CLOUD_NAME } from "@/constants";

const cloudName = CLOUDINARY_CLOUD_NAME || "demo";
const cld = new Cloudinary({ cloud: { cloudName } });

export const bannerPhoto = (imageCldPubId: string, name: string) => {
  if (!imageCldPubId) {
    return `https://placehold.co/1200x297?text=${encodeURIComponent(name || "Class")}`;
  }

  try {
    const image = cld.image(imageCldPubId);
    return image.toURL();
  } catch {
    return `https://placehold.co/1200x297?text=${encodeURIComponent(name || "Class")}`;
  }
};
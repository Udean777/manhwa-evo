import { firestore } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ResponseType, UserDataType } from "@/utils/types";
import { uploadFileToCloudinary } from "./imageService";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
    if (updatedData.image && updatedData.image.uri) {
      const imageUploadRes = await uploadFileToCloudinary(
        updatedData.image,
        "users"
      );

      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes.msg || "Failed to upload image",
        };
      }

      updatedData.image = imageUploadRes.data;
    }

    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updatedData);

    return { success: true, msg: "Updated successfully" };
  } catch (error: any) {
    console.error("Error updating user", error);
    return { success: false, msg: error?.message };
  }
};

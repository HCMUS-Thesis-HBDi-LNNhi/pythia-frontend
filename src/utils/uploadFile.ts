import { toast } from "components/common";
import API from "const/api.const";
import { Dispatch, SetStateAction } from "react";
import { fetcher } from "./fetcher";

export const handleUpload = async (
  file: File,
  userID: string,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("user_id", userID);

    const response = await fetcher.post(API.POST.uploadFile, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 204) toast("Upload success", "success");
  } catch (error) {
    console.error(error);
    toast("Something went wrong", "failure");
  } finally {
    setLoading(false);
  }
};

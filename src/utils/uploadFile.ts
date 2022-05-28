import { toast } from "components/common";
import API from "const/api.const";
import { FileType } from "interfaces/utils.interface";
import { Dispatch, SetStateAction } from "react";
import { fetcher } from "./fetcher";

export const handleUpload = async (
  file: File,
  userID: string,
  type: FileType,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async function (e) {
      const rows = e.target?.result as string;
      const header = rows.split("\r\n")[0];
      if (type === "transaction" && header !== "user_id,amount,date") {
        toast("Wrong file format. Please try again!", "failure");
        throw "Wrong file format";
      }
      if (
        type === "demographic" &&
        header !==
          "ID,Day of birth,Gender,Country,City,Job title,Job industry,Wealth segment"
      ) {
        toast("Wrong file format. Please try again!", "failure");
        throw "Wrong file format";
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);
      formData.append("user_id", userID);
      formData.append("type", type);

      const response = await fetcher.post(API.POST.uploadFile, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 204) toast("Upload success", "success");
    };
    reader.readAsText(file);
  } catch (error) {
    console.error(error);
    toast("Something went wrong", "failure");
  } finally {
    setLoading(false);
  }
};

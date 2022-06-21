import { toast } from "components/common";
import API from "const/api.const";
import Errors from "const/error.const";
import { FileType } from "interfaces/utils.interface";
import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import handleErrors from "./errors.utils";
import { fetcher } from "./fetcher.utils";

export const handleUpload = async (
  file: File,
  userID: string,
  type: FileType,
  setLoading: Dispatch<SetStateAction<boolean>>,
  router: NextRouter
) => {
  try {
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async function (e) {
      const rows = e.target?.result as string;
      const header = rows.split("\r\n")[0];
      if (type === "transaction" && header !== "user_id,amount,date") {
        throw Errors.formatError;
      }
      if (
        type === "demographic" &&
        header !==
          "ID,Day of birth,Gender,Country,City,Job title,Job industry,Wealth segment"
      ) {
        throw Errors.formatError;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);
      formData.append("user_id", userID);
      formData.append("type", type);

      const response = await fetcher.post(API.POST.uploadFile, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status !== 204) throw Errors[response.status] ?? response;
      else toast("Upload successful", "success");
    };
    reader.readAsText(file);
  } catch (error) {
    handleErrors(error, router);
  } finally {
    setLoading(false);
  }
};

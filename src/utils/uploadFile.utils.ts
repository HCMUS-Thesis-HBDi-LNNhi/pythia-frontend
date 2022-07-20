import { toast } from "components/common";
import API from "const/api.const";
import { demographicHeader, transactionHeader } from "const/chart.const";
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
      switch (type) {
        case "transaction":
          if (header !== transactionHeader) throw Errors.formatError;
          break;
        default:
          if (header !== demographicHeader) throw Errors.formatError;
          break;
      }

      let url = API.POST.uploadFile;
      if (type === "classification") {
        url = API.POST.uploadClassifyData(userID);
      }

      const formData = new FormData();
      formData.append("file", file);
      if (type !== "classification") {
        formData.append("name", file.name);
        formData.append("user_id", userID);
        formData.append("type", type);
      }

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const response = await fetcher.post(url, formData, config);

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

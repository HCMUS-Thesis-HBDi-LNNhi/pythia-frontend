import { useRouter, NextRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import Button from "./button.component";
import { toast } from "components/common";

import API from "const/api.const";
import Errors from "const/error.const";
import { demographicHeader, transactionHeader } from "const/chart.const";

import { FileType } from "interfaces/utils.interface";

import handleErrors from "utils/errors.utils";
import fetcher from "utils/fetcher.utils";
import icons from "const/icons.const";

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
  fileType: FileType;
  label?: string;
  setUploadSuccess?: (value: boolean) => void;
}

export default function UploadButton(props: Props) {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        hidden
        onChange={(e) => {
          if (!userID) {
            handleErrors(Errors[401], router);
            return;
          }
          const file = e.target.files && e.target.files[0];
          if (file) {
            handleUpload(
              file,
              userID,
              props.fileType,
              props.setLoading,
              router,
              props.setUploadSuccess
            );
          }
          /** clear input file */
          e.target.value = "";
        }}
      />
      <Button
        style="outline"
        className="border border-primary-500 ml-2"
        icon={icons.outline.upload}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        {props.label ?? "Upload data"}
      </Button>
    </>
  );
}

async function handleUpload(
  file: File,
  userID: string,
  type: FileType,
  setLoading: Dispatch<SetStateAction<boolean>>,
  router: NextRouter,
  setUploadSuccess?: (value: boolean) => void
): Promise<void> {
  try {
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async function (e) {
      const rows = e.target?.result as string;
      const header = rows.split("\n")[0].trim().replaceAll(" ", "");

      if (type === "transaction") {
        if (header !== transactionHeader) {
          handleErrors(Errors.formatError, router);
          return;
        }
      } else {
        if (header !== demographicHeader) {
          handleErrors(Errors.formatError, router);
          return;
        }
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
      else {
        toast("Upload successful", "success");
        setUploadSuccess && setUploadSuccess(true);
      }
    };
    reader.readAsText(file);
  } catch (error) {
    handleErrors(error, router);
  } finally {
    setLoading(false);
  }
}

import { PageLabels } from "interfaces/common.interface";
import { FileType } from "interfaces/utils.interface";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { handleUpload } from "utils/uploadFile";
import toast from "../toast.component";
import Button from "./button.component";

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
  fileType: FileType;
  label?: string;
}

export default function UploadButton(props: Props) {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    if (!userID) {
      toast("Something went wrong, please login again!", "failure");
      router.push(`/${PageLabels.LOGIN}`);
      return;
    }

    handleUpload(file, userID, props.fileType, props.setLoading);
  }, [file, props, router, userID]);

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        hidden
        onChange={(e) => {
          setFile(e.target.files && e.target.files[0]);
          // clear input file
          e.target.value = "";
        }}
      />
      <Button
        style="solid"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        {props.label ?? "Upload data"}
      </Button>
    </>
  );
}

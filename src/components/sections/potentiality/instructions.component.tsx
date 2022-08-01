import { Dispatch, SetStateAction, useState } from "react";

import { Button, Dialog, UploadButton } from "components/common";
import icons from "const/icons.const";

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFirstUser: Dispatch<SetStateAction<boolean>>;
}

export default function Instructions(props: Props): JSX.Element {
  const [classification, setClassification] = useState(false);

  return (
    <Dialog className="text-primary-700 py-6 px-4 space-y-4 max-w-screen-sm">
      <h1 className="text-2xl font-bold text-center">Instruction</h1>
      <h3 className="px-4 text-sm font-light text-center tracking-wide">
        Potentiality page will help you determine between potential and
        non-potential customers using our classification technique.
      </h3>
      <h3 className="font-medium italic text-center">
        Please upload demographic data to continue.
      </h3>
      <div className="grid place-content-center">
        <UploadButton
          setLoading={props.setLoading}
          fileType="classification"
          setUploadSuccess={setClassification}
        />
      </div>
      <div className="flex justify-end items-center space-x-2 pt-4">
        <Button
          style="outline"
          className="border border-primary-500"
          icon={icons.outline.download}
        >
          <a href="templates.zip" download="Customer transaction template">
            Templates
          </a>
        </Button>
        <Button
          style="solid"
          onClick={() => {
            props.setFirstUser(false);
            window.location.reload();
          }}
          disabled={!classification}
        >
          Finish
        </Button>
      </div>
    </Dialog>
  );
}

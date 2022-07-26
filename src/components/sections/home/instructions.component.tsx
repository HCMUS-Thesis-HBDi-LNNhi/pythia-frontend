import { Dispatch, SetStateAction, useState } from "react";

import { Button, Dialog, UploadButton } from "components/common";

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFirstUser: Dispatch<SetStateAction<boolean>>;
}

export default function Instructions(props: Props): JSX.Element {
  const [transaction, setTransaction] = useState(false);
  const [demographic, setDemographic] = useState(false);

  return (
    <Dialog className="text-primary-700 p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Instruction</h1>
      <h3 className="font-medium italic">
        Welcome to Pythia! Before continue, please
      </h3>
      <div className="space-x-2">
        <input type="checkbox" checked={transaction} readOnly />
        <span>Upload customers transactions</span>
      </div>
      <div className="grid place-content-center">
        <UploadButton
          setLoading={props.setLoading}
          fileType="transaction"
          setUploadSuccess={setTransaction}
        />
      </div>
      <div className="space-x-2">
        <input type="checkbox" checked={demographic} readOnly />
        <span>Upload customers demographic</span>
      </div>
      <div className="grid place-content-center">
        <UploadButton
          setLoading={props.setLoading}
          fileType="demographic"
          setUploadSuccess={setDemographic}
        />
      </div>
      <div className="grid place-content-center pt-6">
        <Button
          style="solid"
          onClick={() => {
            props.setFirstUser(false);
            window.location.reload();
          }}
          disabled={!transaction || !demographic}
        >
          Submit
        </Button>
      </div>
    </Dialog>
  );
}

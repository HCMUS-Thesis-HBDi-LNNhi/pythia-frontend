import { useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import { Layout } from "components/common";
import { Header, RFMBody, BGNBDBody } from "components/sections/segmentation";

import { RetainModel } from "interfaces/segmentation.interface";

export default function Segmentation(): JSX.Element {
  const userID = useReadLocalStorage<string>("user-id");
  const [isLoading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(RetainModel.rfm);
  const [displayGrid, setDisplayGrid] = useState(true);
  const [status, setStatus] = useState("");

  return (
    <Layout
      title="Segmentation"
      className="space-y-8 text-primary-700"
      isLoading={isLoading}
    >
      <Header
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        setLoading={setLoading}
        displayGrid={displayGrid}
        setDisplayGrid={setDisplayGrid}
        status={status}
      />
      {selectedModel === RetainModel.bg_nbd ? (
        <BGNBDBody
          userID={userID}
          setLoading={setLoading}
          displayGrid={displayGrid}
          setStatus={setStatus}
        />
      ) : (
        <RFMBody
          userID={userID}
          setLoading={setLoading}
          displayGrid={displayGrid}
          setStatus={setStatus}
        />
      )}
    </Layout>
  );
}

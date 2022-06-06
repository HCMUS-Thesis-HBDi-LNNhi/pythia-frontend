import { Header, RFMBody } from "components/sections/segmentation";
import { Layout } from "components/common";
import { useState } from "react";
import { RetainModel } from "interfaces/segmentation.interface";
import { useReadLocalStorage } from "usehooks-ts";

export default function Segmentation(): JSX.Element {
  const userID = useReadLocalStorage<string>("user-id");
  const [isLoading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<RetainModel>(
    RetainModel.rfm
  );

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
      />

      {/* TODO: Implement segmentation charts */}
      {selectedModel === RetainModel.bg_nbd ? (
        <div>WIP</div>
      ) : (
        <RFMBody userID={userID} setLoading={setLoading} />
      )}
    </Layout>
  );
}

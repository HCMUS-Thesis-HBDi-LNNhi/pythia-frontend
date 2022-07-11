import { Header, RFMBody } from "components/sections/segmentation";
import { Layout } from "components/common";
import { useState } from "react";
import { RetainModel } from "interfaces/segmentation.interface";
import { BGNBDBody } from "components/sections/segmentation";

export default function Segmentation(): JSX.Element {
  const [isLoading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<RetainModel>(
    RetainModel.rfm
  );
  const [displayGrid, setDisplayGrid] = useState(true);

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
      />
      {selectedModel === RetainModel.bg_nbd ? (
        <BGNBDBody setLoading={setLoading} displayGrid={displayGrid} />
      ) : (
        <RFMBody setLoading={setLoading} displayGrid={displayGrid} />
      )}
    </Layout>
  );
}

import React from "react";
import type { MLPResponseData } from "../../types/api";
import ConfidenceScore from "../ui/ConfidenceScore";
import ModelInfo from "../ui/ModelInfo";
import ModelInputInfo from "../ui/ModelInput";

interface Props {
  data: MLPResponseData;
}

const MlpDetailResult: React.FC<Props> = ({ data }) => {

  return (
    <>
      <ConfidenceScore
        confidenceScore={data.certainty_score * 100}
        classProbabilities={[
          { label: "Cammeo", percentage: data.probabilities.Cammeo * 100 },
          { label: "Osmancik", percentage: data.probabilities.Osmancik * 100 },
        ]}
      />

      <ModelInfo
        modelName={data.model}
        parameters={[
          {
            key: "Activation",
            value: data.hyperparameters.activation,
          },
          { key: "Alpha", value: data.hyperparameters.alpha },

          {
            key: "Learning Rate Init",
            value: data.hyperparameters.learning_rate_init,
          },

          {
            key: "Số tầng ẩn",
            value: Array.isArray(data.hyperparameters.hidden_layer_sizes)
              ? `${data.hyperparameters.hidden_layer_sizes.length} tầng`
              : "1 tầng",
          },
          {
            key: "Cấu trúc tầng ẩn",
            value: Array.isArray(data.hyperparameters.hidden_layer_sizes)
              ? data.hyperparameters.hidden_layer_sizes.join(" - ") 
              : `${data.hyperparameters.hidden_layer_sizes}`,
          },
        ]}
      />

      <ModelInputInfo inputs={data.input} />
    </>
  );
};

export default MlpDetailResult;

import React from "react";
import ConfidenceScore from "../ui/ConfidenceScore";
import type { AdaBoostResponseData } from "../../types/api";
import ModelInfo from "../ui/ModelInfo";
import ModelInputInfo from "../ui/ModelInput";
import FeatureImportances from "../ui/FeatureImpotances";

interface Props {
  data: AdaBoostResponseData
}

const AdaboostDetailResult: React.FC<Props> = ({ data }) => {
  return (
    <>
      <ConfidenceScore
        confidenceScore={
          Math.max(data.probabilities.Cammeo, data.probabilities.Osmancik) * 100
        }
        classProbabilities={[
          { label: "Cammeo", percentage: data.probabilities.Cammeo * 100 },
          { label: "Osmancik", percentage: data.probabilities.Osmancik * 100 },
        ]}
      />

      <ModelInfo
        modelName={data.model}
        parameters={[
          {
            key: "Algorithm",
            value: data.hyperparameters.algorithm
          },
          { key: "learning_rate", value: data.hyperparameters.learning_rate },

          {
            key: "n_estimators",
            value: data.hyperparameters.n_estimators,
          }
        ]}
      />

      <ModelInputInfo inputs={data.input} />
      {/* <div>
    {sortedFeatures.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-2">
            Độ quan trọng của các đặc trưng
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {sortedFeatures.map(([feature, value]) => (
              <li key={feature}>
                <strong>{feature}:</strong> {(value * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
          <p className="mt-2 italic text-sm text-gray-600 dark:text-gray-400">
            Đặc trưng có độ quan trọng cao nhất ảnh hưởng nhiều nhất đến quyết
            định cuối cùng.
          </p>
        </div>
      )}
    </div> */}

      <FeatureImportances feature_importances={data.feature_importances} />
    </>
  );
};

export default AdaboostDetailResult;

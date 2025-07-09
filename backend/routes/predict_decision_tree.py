from flask import Blueprint, request, jsonify
from models import decision_tree_model
from utils.extract import extract_features, wrap_with_column_names

dt_route = Blueprint("dt_route", __name__)

@dt_route.route("/decision-tree", methods=["POST"])
def predict_decision_tree():
    try:
        data = request.json
        features = extract_features(data)
        df = wrap_with_column_names(features)
        result = decision_tree_model.predict(df)[0]

        predict = "O"
        if (result == 0):
            predict = "C"

        return jsonify({
            "success": True,
            "data": {
                "model": "Decision Tree",
                "input": data,
                "prediction": predict
            },
            "message": "Dự đoán thành công"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "data": None,
            "message": str(e)
        }), 400
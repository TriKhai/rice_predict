from flask import Blueprint, request, jsonify
from models import random_forest_model
from utils.extract import extract_features, wrap_with_column_names

rf_route = Blueprint("rf_route", __name__)

@rf_route.route("/random-forest", methods=["POST"])
def predict_rf():
    try:
        data = request.json
        features = extract_features(data)
        df = wrap_with_column_names(features)
        result = random_forest_model.predict(df)[0]

        predict = "O"
        if (result == 0):
            predict = "C"

        return jsonify({
            "success": True,
            "data": {
                "model": "Random Forest",
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
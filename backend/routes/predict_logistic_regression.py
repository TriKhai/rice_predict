from flask import Blueprint, request, jsonify
from models import logistic_regression_model
from utils.extract import extract_features, scale_data

logistic_regression_route = Blueprint("logistic_regression_route", __name__)

@logistic_regression_route.route("/logistic-regression", methods=["POST"])
def predict_logistic_regression():
    try:
        data = request.json

        features = extract_features(data)
        features = scale_data(features)

        result = logistic_regression_model.predict(features)[0]

        predict = "O"
        if(result == 0):
            predict = "C"

        return jsonify({
            "success": True,
            "data": {
                "model": "Logistic Regression",
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
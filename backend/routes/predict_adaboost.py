from flask import Blueprint, request, jsonify
from models import adaboost_model
from utils.extract import extract_features

adaboost_route = Blueprint("adaboost_route", __name__)

@adaboost_route.route("/adaboost", methods=["POST"])
def predict_adaboost():
    try:
        data = request.json
        features = extract_features(data)
        result = adaboost_model.predict(features)[0]

        predict = "O"
        if (result == 0):
            predict = "C"

        return jsonify({
            "success": True,
            "data": {
                "model": "Adaboost",
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
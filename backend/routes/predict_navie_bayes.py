from flask import Blueprint, request, jsonify
from models import navie_bayes_model
from utils.extract import extract_features

navie_bayes_route = Blueprint("navie_bayes_route", __name__)

@navie_bayes_route.route("/naive-bayes", methods=["POST"])
def predict_navie_bayes():
    try:
        data = request.json
        features = extract_features(data)
        result = navie_bayes_model.predict(features)[0]

        predict = "O"
        if (result == 0):
            predict = "C"

        return jsonify({
            "success": True,
            "data": {
                "model": "Naive Bayes",
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
from flask import Blueprint, request, jsonify
from models import knn_model
from utils.extract import extract_features, scale_data

knn_route = Blueprint("knn_route", __name__)

@knn_route.route("/k-nearest-neighbors", methods=["POST"])
def predict_knn():
    try:
        data = request.json

        features = extract_features(data)
        features = scale_data(features)

        result = knn_model.predict(features)[0]

        predict = "O"
        if(result == 0):
            predict = "C"

        return jsonify({
            "success": True,
            "data": {
                "model": "K-Nearest Neighbors",
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
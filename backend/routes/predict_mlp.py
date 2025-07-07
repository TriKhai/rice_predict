from flask import Blueprint, request, jsonify
from models import multilayer_perceptron_model
from utils.extract import extract_features, scale_data

mlp_route = Blueprint("mlp_route", __name__)

@mlp_route.route("/multilayer-perceptron", methods=["POST"])
def predict_mlp():
    try:
        data = request.json

        features = extract_features(data)
        features = scale_data(features)

        result = multilayer_perceptron_model.predict(features)[0]

        predict = "O"
        if(result == 0):
            predict = "C"

        return jsonify({
            "success": True,
            "data": {
                "model": "Multilayer Perceptron",
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
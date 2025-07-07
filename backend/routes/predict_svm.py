from flask import Blueprint, request, jsonify
from models import support_vector_machine_model
from utils.extract import extract_features, scale_data

svm_route = Blueprint("svm_route", __name__)

@svm_route.route("/support-vector-machine", methods=["POST"])
def predict_mpl():
    try:
        data = request.json

        features = extract_features(data)
        features = scale_data(features)

        result = support_vector_machine_model.predict(features)[0]

        predict = "O"
        if(result == 0):
            predict = "C"

        return jsonify({
            "success": True,
            "data": {
                "model": "SVM (Support Vector Machine)",
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
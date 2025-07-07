from flask import Blueprint

from .predict_knn import knn_route
from .predict_navie_bayes import navie_bayes_route

def register_router(app):
    # app.register_blueprint(knn_route)
    # app.register_blueprint(navie_bayes_route)

    api_v1 = Blueprint("api_v1", __name__, url_prefix="/api/v1")

    # Gắn các route con vào blueprint gốc
    api_v1.register_blueprint(knn_route, url_prefix="/predict")
    api_v1.register_blueprint(navie_bayes_route, url_prefix="/predict")

    app.register_blueprint(api_v1)
import numpy as np
import pickle

def extract_features(data):
    try:
        return np.array([
            data["area"],
            data["perimeter"],
            data["major_axis_length"],
            data["minor_axis_length"],
            data["eccentricity"],
            data["convex_area"],
            data["extent"]
        ]).reshape(1, -1)
    except KeyError as e:
        raise ValueError(f"Thiếu trường: {e.args[0]}")


scaler = pickle.load(open("models/scaler.pkl", "rb"))

def scale_data(features):
    return scaler.transform(features)
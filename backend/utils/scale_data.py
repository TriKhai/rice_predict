import pickle
import numpy as np

scaler = pickle.load(open("models/scaler.pkl", "rb"))

def scale_data(features):
    return scaler.transform(features)
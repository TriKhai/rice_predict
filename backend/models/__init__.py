import pickle

knn_model = pickle.load(open("models/kNN.pkl", "rb"))
navie_bayes_model = pickle.load(open("models/Naive_Bayes.pkl", "rb"))
adaboost_model = pickle.load(open("models/AdaBoost.pkl", "rb"))
decision_tree_model = pickle.load(open("models/Decision_Tree.pkl", "rb"))
logistic_regression_model = pickle.load(open("models/Logistic_Regression.pkl", "rb"))
multilayer_perceptron_model = pickle.load(open("models/MLP.pkl", "rb"))
random_forest_model = pickle.load(open("models/Random_Forest.pkl", "rb"))
support_vector_machine_model = pickle.load(open("models/SVM.pkl", "rb"))
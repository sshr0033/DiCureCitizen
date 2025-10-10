package com.dicurecitizen.digitalCitizen.model;
public class PredictResponse {
    private int probability;

    public PredictResponse(int probability)
    {
        this.probability = probability;
    }
    public int getProbability()
    { return probability;
    }
    public void setProbability(int probability) {
        this.probability = probability;
    }
}

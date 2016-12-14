package com.itechart.stockOnline.model.dto.stock;


public class ValidationShelf {
    private String shelfsError;
    private String numberError;
    private String capacityError;

    public ValidationShelf() {
    }

    public ValidationShelf(String shelfsError, String numberError, String capacityError) {
        this.shelfsError = shelfsError;
        this.numberError = numberError;
        this.capacityError = capacityError;
    }
    public String getShelfsError() { return shelfsError; }
    public void setShelfsError(String shelfsError) { this.shelfsError = shelfsError; }

    public String getNumberError() { return numberError; }
    public void setNumberError(String numberError) { this.numberError = numberError; }

    public String getCapacityError() { return capacityError; }
    public void setCapacityError(String capacityError) { this.capacityError = capacityError; }

    @Override
    public String toString() {
        return "ValidationShelf{" +
                "shelfsError='" + shelfsError + '\'' +
                ", numberError='" + numberError + '\'' +
                ", capacityError='" + capacityError + '\'' +
                '}';
    }
}

package com.itechart.stockOnline.model.dto.stock;


public class ValidationRooms {
    private String roomsError;
    private String numberError;
    private String costError;
    private String storageError;

    public ValidationRooms() {
    }
    public ValidationRooms(String roomsError, String numberError, String costError, String storageError) {
        this.roomsError = roomsError;
        this.numberError = numberError;
        this.costError = costError;
        this.storageError = storageError;
    }
    public String getRoomsError() { return roomsError; }
    public void setRoomsError(String roomsError) { this.roomsError = roomsError; }

    public String getNumberError() { return numberError; }
    public void setNumberError(String numberError) { this.numberError = numberError; }

    public String getCostError() { return costError; }
    public void setCostError(String costError) { this.costError = costError; }

    public String getStorageError() { return storageError; }
    public void setStorageError(String storageError) { this.storageError = storageError; }

    @Override
    public String toString() {
        return "ValidationRooms{" +
                "roomsError='" + roomsError + '\'' +
                ", numberError='" + numberError + '\'' +
                ", costError='" + costError + '\'' +
                ", storageError='" + storageError + '\'' +
                '}';
    }
}

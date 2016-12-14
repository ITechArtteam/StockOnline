package com.itechart.stockOnline.model.dto.stock;


import java.util.Set;

public class RoomDto {

    private Boolean isOpen = false;
    private Integer idRoom;
    private Double cost;
    private String number;
    private String storage;
    private String selectedShelfName;
    private Set<ShelfDto> shelfs;
    private ValidationShelf validationErrors;


    public RoomDto() {
    }

    public RoomDto(ValidationShelf validationErrors) {
        this.validationErrors = validationErrors;
    }
    @Deprecated
    public Boolean getIsOpen() { return isOpen; }
    @Deprecated
    public void setIsOpen(Boolean isOpen) { this.isOpen = isOpen; }

    @Deprecated
    public String getSelectedShelfName() { return selectedShelfName; }
    @Deprecated
    public void setSelectedShelfName(String selectedShelfName) { this.selectedShelfName = selectedShelfName; }

    public Integer getIdRoom() { return idRoom; }
    public void setIdRoom(Integer idRoom) { this.idRoom = idRoom; }

    public Double getCost() {return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public String getStorage() { return storage; }
    public void setStorage(String storage) { this.storage = storage; }

    public Set<ShelfDto> getShelfs() { return shelfs; }
    public void setShelfs(Set<ShelfDto> shelfs) { this.shelfs = shelfs; }

    public ValidationShelf getValidationErrors() { return validationErrors; }
    public void setValidationErrors(ValidationShelf validationErrors) { this.validationErrors = validationErrors; }

    @Override
    public String toString() {
        return "RoomDto{" +
                "isOpen=" + isOpen +
                ", idRoom=" + idRoom +
                ", cost=" + cost +
                ", number='" + number + '\'' +
                ", storage='" + storage + '\'' +
                ", selectedShelfName='" + selectedShelfName + '\'' +
                ", shelfs=" + shelfs +
                ", validationErrors=" + validationErrors +
                '}';
    }
}

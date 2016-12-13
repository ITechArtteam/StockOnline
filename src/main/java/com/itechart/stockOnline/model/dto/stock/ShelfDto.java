package com.itechart.stockOnline.model.dto.stock;


public class ShelfDto {
    private Boolean isOpen = false;
    private String number;
    private Integer capacity;
    private Boolean isFree;
    private Integer idShelf;

    public ShelfDto() {
    }

    public Boolean getIsOpen() { return isOpen; }
    public void setIsOpen(Boolean isOpen) { this.isOpen = isOpen; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public Boolean getIsFree() { return isFree; }
    public void setIsFree(Boolean isFree) { this.isFree = isFree; }

    public Integer getIdShelf() { return idShelf; }
    public void setIdShelf(Integer idShelf) { this.idShelf = idShelf; }

    @Override
    public String toString() {
        return "ShelfDto{" +
                "isOpen=" + isOpen +
                ", number='" + number + '\'' +
                ", capacity=" + capacity +
                ", isFree=" + isFree +
                ", id=" + idShelf +
                '}';
    }
}

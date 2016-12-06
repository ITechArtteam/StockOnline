package com.itechart.stockOnline.model.dto.forDistributionGoodsPage;

import com.itechart.stockOnline.model.Shelf;

public class ShelfForDistributionGoodsDto {
    private Integer id;
    private String number;
    private Integer capacity;
    private Boolean isFree;

    public ShelfForDistributionGoodsDto(Shelf shelf) {
        this.id = shelf.getId();
        this.number = shelf.getNumber();
        this.capacity = shelf.getCapacity();
        this.isFree = shelf.getFree();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Boolean getFree() {
        return isFree;
    }

    public void setFree(Boolean free) {
        isFree = free;
    }
}

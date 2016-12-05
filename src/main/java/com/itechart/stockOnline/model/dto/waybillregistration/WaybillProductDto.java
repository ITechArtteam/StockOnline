package com.itechart.stockOnline.model.dto.waybillregistration;

import com.itechart.stockOnline.model.enums.ProductUnit;

public class WaybillProductDto {

    private String name;
    private Integer count;
    private Integer price;
    private String storage;
    private ProductUnit unit;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getStorage() {
        return storage;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    public ProductUnit getUnit() {
        return unit;
    }

    public void setUnit(ProductUnit unit) {
        this.unit = unit;
    }
}

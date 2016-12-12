package com.itechart.stockOnline.model.dto.forControllerPage;

import com.itechart.stockOnline.model.Product;
import com.itechart.stockOnline.model.enums.ProductUnit;

import javax.persistence.Column;

public class ProductForControllerDto {
    private Integer id;
    private String name;
    private ProductUnit unit;
    private Double cost;
    private Integer count;
    private StorageRequirementForControllerDto storage;

    public ProductForControllerDto(Product product) {
        if(product != null) {
            this.id = product.getId();
            this.name = product.getName();
            this.unit = product.getUnit();
            this.cost = product.getCost();
            this.count = product.getCount();
            if(product.getStorage() != null) {
                this.storage = new StorageRequirementForControllerDto(product.getStorage());
            }
        }
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ProductUnit getUnit() {
        return unit;
    }

    public void setUnit(ProductUnit unit) {
        this.unit = unit;
    }

    public StorageRequirementForControllerDto getStorage() {
        return storage;
    }

    public void setStorage(StorageRequirementForControllerDto storage) {
        this.storage = storage;
    }
}

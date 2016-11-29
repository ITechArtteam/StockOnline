package com.itechart.stockOnline.model.dto.forControllerPage;

import com.itechart.stockOnline.model.Product;
import com.itechart.stockOnline.model.enums.ProductUnit;

public class ProductForControllerDto {
    private String name;
    private ProductUnit unit;
    private StorageRequirementForControllerDto storage;

    public ProductForControllerDto(Product product) {
        if(product != null) {
            this.name = product.getName();
            this.unit = product.getUnit();
            if(product.getStorage() != null) {
                this.storage = new StorageRequirementForControllerDto(product.getStorage());
            }
        }
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

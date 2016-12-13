package com.itechart.stockOnline.model.dto.forDistributionGoodsPage;

import java.util.List;

public class ProductForDistributionGoodsFinishDto {
    private String waybillNumber;
    private Integer productId;
    private List<ShelfFinishDto> shelves;

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public List<ShelfFinishDto> getShelves() {
        return shelves;
    }

    public void setShelves(List<ShelfFinishDto> shelves) {
        this.shelves = shelves;
    }

    public String getWaybillNumber() {
        return waybillNumber;
    }

    public void setWaybillNumber(String waybillNumber) {
        this.waybillNumber = waybillNumber;
    }

    @Override
    public String toString() {
        return "productId: " + productId + " shelves: " + shelves.toString();
    }
}

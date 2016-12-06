package com.itechart.stockOnline.model.dto.forDistributionGoodsPage;

import java.util.List;

public class ProductForDistributionGoodsFinishDto {
    private String waybillNumber;
    private Integer productId;
    private List<Integer> shelves;
//    private Integer count;

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public List<Integer> getShelves() {
        return shelves;
    }

    public void setShelves(List<Integer> shelves) {
        this.shelves = shelves;
    }

    public String getWaybillNumber() {
        return waybillNumber;
    }

    public void setWaybillNumber(String waybillNumber) {
        this.waybillNumber = waybillNumber;
    }

//    public Integer getCount() {
//        return count;
//    }
//
//    public void setCount(Integer count) {
//        this.count = count;
//    }

    @Override
    public String toString() {
        return "productId: " + productId + " shelves: " + shelves.toString();
    }
}

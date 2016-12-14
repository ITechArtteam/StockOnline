package com.itechart.stockOnline.model.dto.forControllerPage;

import com.itechart.stockOnline.model.ProductInWaybill;

public class ProductInWaybillForControllerDto {
    private Integer count;
    private ProductForControllerDto product;

    public ProductInWaybillForControllerDto(ProductInWaybill productInWaybill) {
        if(productInWaybill != null) {
            this.count = productInWaybill.getProduct().getCount();
            if(productInWaybill.getProduct() != null) {
                this.product = new ProductForControllerDto(productInWaybill.getProduct());
            }
        }
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public ProductForControllerDto getProduct() {
        return product;
    }

    public void setProduct(ProductForControllerDto product) {
        this.product = product;
    }
}

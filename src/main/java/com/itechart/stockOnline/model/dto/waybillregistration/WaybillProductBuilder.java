package com.itechart.stockOnline.model.dto.waybillregistration;

import com.itechart.stockOnline.model.Product;
import com.itechart.stockOnline.model.ProductInWaybill;
import com.itechart.stockOnline.model.StorageRequirement;
import com.itechart.stockOnline.model.enums.ProductStatus;
import org.springframework.stereotype.Component;

@Component
public class WaybillProductBuilder {

    public ProductInWaybill buildFromDto(WaybillProductDto dto) {
        ProductInWaybill waybillProduct = new ProductInWaybill();
        waybillProduct.setCount(dto.getCount());

        Product product = new Product();

        product.setCost(dto.getPrice());
        product.setName(dto.getName());
        product.setCount(dto.getCount());

        StorageRequirement storageRequirement = new StorageRequirement();
        storageRequirement.setType(dto.getStorage());
        product.setStorage(storageRequirement);

        product.setUnit(dto.getUnit());
        product.setStatus(ProductStatus.JOINED);

        waybillProduct.setProduct(product);

        return waybillProduct;
    }
}

package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.WaybillProductDao;
import com.itechart.stockOnline.model.Product;
import com.itechart.stockOnline.model.ProductInWaybill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WaybillProductServiceImpl implements WaybillProductService {

    @Autowired
    private WaybillProductDao waybillProductDao;

    @Autowired
    private ProductService productService;

    @Override
    public ProductInWaybill save(ProductInWaybill waybillProduct) {

        Product product = waybillProduct.getProduct();

        Product storedProduct = productService.get(product.getName());
        if (storedProduct != null) {
            storedProduct.setCost(product.getCost());
            storedProduct.setCount(storedProduct.getCount() + waybillProduct.getCount());
            product = storedProduct;
        }

        waybillProduct.setProduct(productService.save(product));

        return waybillProductDao.save(waybillProduct);
    }
}

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

        System.out.println(product.getName());

        if (storedProduct != null) {
            product = storedProduct;
        } else {
            product = productService.save(product);
        }

        waybillProduct.setProduct(product);

        return waybillProductDao.save(waybillProduct);
    }
}

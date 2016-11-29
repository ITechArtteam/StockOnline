package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.ProductDao;
import com.itechart.stockOnline.model.Product;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final static org.slf4j.Logger Logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Autowired
    private ProductDao productDao;

    @Override
    @Transactional
    public List<Product> update(List<Product> products) {
        Logger.info("Product service_update: updating list of products {}", products);
        return productDao.save(products);
    }
}

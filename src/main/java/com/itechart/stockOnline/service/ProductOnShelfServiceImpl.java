package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.ProductOnShelfDao;
import com.itechart.stockOnline.model.ProductOnShelf;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductOnShelfServiceImpl implements ProductOnShelfService {
    private static final Logger logger = LoggerFactory.getLogger(ProductOnShelfServiceImpl.class);


    @Autowired
    private ProductOnShelfDao productOnShelfDao;

    @Override
    public ProductOnShelf save(ProductOnShelf productOnShelf) {
        logger.info("save({})", productOnShelf);
        return productOnShelfDao.save(productOnShelf);
    }
}

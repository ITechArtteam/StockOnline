package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.ProductDao;
import com.itechart.stockOnline.model.Product;
import com.itechart.stockOnline.model.StorageRequirement;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final static org.slf4j.Logger Logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Autowired
    private ProductDao productDao;

    @Autowired
    private StorageRequirementService storageRequirementService;

    @Override
    @Transactional
    public List<Product> update(List<Product> products) {
        Logger.info("Product service_update: updating list of products {}", products);
        return productDao.save(products);
    }

    @Override
    public List<Product> getAll() {
        return productDao.findAll();
    }

    @Override
    public Product get(Long id) {
        return productDao.findOne(id);
    }

    @Override
    public Product get(String name) {
        return productDao.findByName(name);
    }

    @Override
    public void delete(Long id) {
        productDao.delete(id);
    }

    @Override
    public Product save(Product product) {
        StorageRequirement storageRequirement =
                storageRequirementService.get(product.getStorage().getType());

        System.out.println("-----------------------" + product.getStorage().getType());

        if (storageRequirement == null) {
            System.out.println("SAVE");
            storageRequirement = storageRequirementService.save(product.getStorage());
        } else {
            System.out.println("NOT SAVE");
        }

        product.setStorage(storageRequirement);

        return productDao.save(product);
    }

    @Override
    public List<Product> save(List<Product> products) {
        return productDao.save(products);
    }

    @Override
    public void delete(Long[] ids) {
        Arrays.stream(ids).forEach(id -> {
            productDao.delete(id);
        });
    }
}

package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.*;
import com.itechart.stockOnline.model.dto.forDistributionGoodsPage.ProductForDistributionGoodsFinishDto;
import com.itechart.stockOnline.model.enums.ProductStatus;
import com.itechart.stockOnline.model.enums.WaybillStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class DistributionGoodsServiceImpl implements DistributionGoodsService {
    private static final Logger logger = LoggerFactory.getLogger(DistributionGoodsServiceImpl.class);


    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ShelfService shelfService;

    @Autowired
    private ProductOnShelfService productOnShelfService;

    @Autowired
    private WaybillService waybillService;

    @Override
    @Transactional
    public void finishDistribution(List<ProductForDistributionGoodsFinishDto> productList, String userLogin) {
        logger.info("finishDistribution({}, {})", productList, userLogin);
        User user = userService.findByLogin(userLogin);

        Waybill waybill = waybillService.getByNumber(productList.get(0).getWaybillNumber());
        waybill.setStatus(WaybillStatus.REGISTRATION_COMPLETED);
        waybillService.save(waybill);

        productList.forEach(productDto -> {
            Product product = productService.get(productDto.getProductId().longValue());
            productDto.getShelves().forEach(shelf -> {
                Shelf shelf1 = shelfService.find(shelf.getShelfId());
                ProductOnShelf productOnShelf = new ProductOnShelf();
                productOnShelf.setProduct(product);
                productOnShelf.setCount(shelf.getCount());
                productOnShelf.setBeginDate(new Date());
                productOnShelf.setShelf(shelf1);
                productOnShelf.setUser(user);

                productOnShelf = productOnShelfService.save(productOnShelf);

                //set free only if no more free space
                shelf1.setFree(false);
                shelfService.update(shelf1);
            });
            product.setStatus(ProductStatus.APPROVED_FOR_STORAGE);
            productService.save(product);
        });
    }
}

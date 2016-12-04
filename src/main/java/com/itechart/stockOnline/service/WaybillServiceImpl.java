package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.WaybillDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Product;
import com.itechart.stockOnline.model.ProductInWaybill;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.enums.ProductStatus;
import com.itechart.stockOnline.model.enums.WaybillStatus;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class WaybillServiceImpl implements WaybillService {

    private final static org.slf4j.Logger Logger = LoggerFactory.getLogger(WaybillServiceImpl.class);

    private final WaybillDao waybillDao;

    @Autowired
    private UserService userService;

    @Autowired
    private TransportService transportService;

    @Autowired
    private ProductService productService;

    @Autowired
    public WaybillServiceImpl(WaybillDao waybillDao) {
        this.waybillDao = waybillDao;
    }

    @Override
    public Waybill getById(Long id) {
        Logger.info("getById({})", id);
        Waybill waybill = waybillDao.findById(id).orElseThrow(DataNotFoundError::new);
        Logger.info("getById({}): found waybill - {}", id, waybill);
        return waybill;
    }

    @Override
    @Transactional
    public Waybill update(Waybill waybill) {
        Logger.info("update({})", waybill);
        return waybillDao.save(waybill);
    }

    @Override
    @Transactional
    public void completeWayBillChecking(Long waybillId, WaybillStatus waybillStatus, ProductStatus productStatus, String userName) {
        User checkedBy = userService.findByLogin(userName);
        Waybill waybill = getById(waybillId);
        waybill.setCheckedBy(checkedBy);
        Logger.info("completeWayBillChecking(): set checkedBy user {}", checkedBy);
        waybill.setCheckDate(new Date());
        Logger.info("completeWayBillChecking(): set checkDate {}", waybill.getCheckDate());
        update(waybill);
        setWaybillAndProductsStatus(waybill, waybillStatus, productStatus);
    }

    @Override
    @Transactional
    public void setWaybillAndProductsStatus(Long waybillId, WaybillStatus waybillStatus, ProductStatus productStatus) {
        Waybill waybill = getById(waybillId);
        Logger.info("setWaybillAndProductsStatus(): waybillStatus - {}, productStatus - {} by waybillID {}", waybillStatus, productStatus, waybillId);
        setWaybillAndProductsStatus(waybill, waybillStatus, productStatus);
    }

    @Override
    public void setWaybillAndProductsStatus(Waybill waybill, WaybillStatus waybillStatus, ProductStatus productStatus) {
        Logger.info("setWaybillAndProductsStatus(): waybillStatus - {}, productStatus - {} by waybill object {}", waybillStatus, productStatus, waybill);

        waybill.setStatus(waybillStatus);
        update(waybill);

        Set<ProductInWaybill> productsInWaybill = waybill.getProductInWaybills();
        List<Product> productList = productsInWaybill.stream().map(e -> {
            Product p = e.getProduct();
            p.setStatus(productStatus);
            return p;
        }).collect(Collectors.toList());
        productService.update(productList);
    }

    public Waybill save(Waybill waybill) {
        transportService.save(waybill.getTransport());
        return waybillDao.save(waybill);
    }
}

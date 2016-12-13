package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.ActRepository;
import com.itechart.stockOnline.dao.WaybillDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.*;
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
    private ActRepository actRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private WaybillProductService waybillProductService;

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
    public Waybill getByNumber(String number) {
        Logger.info("getByNumber({})", number);
        Waybill waybill = waybillDao.findByNumber(number).orElseThrow(DataNotFoundError::new);
        Logger.info("getByNumber({}): found waybill - {}", number, waybill);
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
    public void completeWayBillChecking(String waybillNumber, WaybillStatus waybillStatus, ProductStatus productStatus, String userName, Act act) {
        User checkedBy = userService.findByLogin(userName);
        Waybill waybill = getByNumber(waybillNumber);
        waybill.setCheckedBy(checkedBy);
        Logger.info("completeWayBillChecking(): set checkedBy user {}", checkedBy);
        waybill.setCheckDate(new Date());
        Logger.info("completeWayBillChecking(): set checkDate {}", waybill.getCheckDate());
        update(waybill);

        setWaybillAndProductsStatus(waybill, waybillStatus, productStatus);
        if (act.getId()!=null) {
            act.setId(null);
            act.setWaybill(waybill);
            act.getProductInActs().forEach((productInAct) -> {
                productInAct.setId(null);
                productInAct.setAct(act);
            });
            actRepository.save(act);
        }
    }

    @Override
    @Transactional
    public void setWaybillAndProductsStatus(String waybillNumber, WaybillStatus waybillStatus, ProductStatus productStatus) {
        Waybill waybill = getByNumber(waybillNumber);
        Logger.info("setWaybillAndProductsStatus(): waybillStatus - {}, productStatus - {} by waybillNumber {}", waybillStatus, productStatus, waybillNumber);
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
        waybill.setTransport(transportService.save(waybill.getTransport()));

        Set<ProductInWaybill> waybillProducts = waybill.getProductInWaybills();
        waybill.setProductInWaybills(null);
        Waybill storedWaybill = waybillDao.save(waybill);

        for (ProductInWaybill waybillProduct : waybillProducts) {
            waybillProduct.setWaybill(storedWaybill);
            waybillProductService.save(waybillProduct);
        }

        return storedWaybill;
    }
}

package com.itechart.stockOnline.service;

import com.itechart.stockOnline.converter.WaybillDtoConverter;
import com.itechart.stockOnline.dao.WaybillDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Product;
import com.itechart.stockOnline.model.ProductInWaybill;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.dto.WaybillPage;
import com.itechart.stockOnline.model.enums.ProductStatus;
import com.itechart.stockOnline.model.enums.WaybillStatus;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.itechart.stockOnline.dao.specification.WaybillSpecifications.*;
import static org.springframework.data.jpa.domain.Specifications.where;


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
    private WaybillProductService waybillProductService;

    @Autowired
    private WaybillDtoConverter waybillDtoConverter;

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
    public void completeWayBillChecking(String waybillNumber, WaybillStatus waybillStatus, ProductStatus productStatus, String userName) {
        User checkedBy = userService.findByLogin(userName);
        Waybill waybill = getByNumber(waybillNumber);
        waybill.setCheckedBy(checkedBy);
        Logger.info("completeWayBillChecking(): set checkedBy user {}", checkedBy);
        waybill.setCheckDate(new Date());
        Logger.info("completeWayBillChecking(): set checkDate {}", waybill.getCheckDate());
        update(waybill);
        setWaybillAndProductsStatus(waybill, waybillStatus, productStatus);
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

    @Override
    public WaybillPage getWaybillPage(int pageNumber, int recordCount, String number, String status, String login) {
        if(pageNumber <= 0 || recordCount <= 0) {
            throw new DataNotFoundError();
        }
        Specification<Waybill> specification = null;
        if(StringUtils.isNotEmpty(number)) {
            specification = where(numberLike(number));
        }

        if(specification != null) {
            specification = where(specification).and(loginLike(login));
        } else {
            specification = where(loginLike(login));
        }


        if(StringUtils.isNotBlank(status) && !StringUtils.equals(status, "2")) {
            switch (status) {
                case "1":
                    if(specification != null) {
                        specification = where(specification).and(typeIncome());
                    } else {
                        specification = where(typeIncome());
                    }
                    break;
                case "0":
                    if(specification != null) {
                        specification = where(specification).and(typeOutcome());
                    } else {
                        specification = where(typeOutcome());
                    }
                    break;
            }
        }


        Page<Waybill> clientCompanyPage = waybillDao.findAll(specification, new PageRequest(pageNumber - 1, recordCount));
        if(clientCompanyPage.getTotalPages() > 0 && clientCompanyPage.getTotalPages() < pageNumber) {
            throw new DataNotFoundError();
        }
        return waybillDtoConverter.toWaybillPage(clientCompanyPage);
    }


}

package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Product;
import com.itechart.stockOnline.model.ProductInWaybill;
import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.enums.ProductStatus;
import com.itechart.stockOnline.model.enums.WaybillStatus;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ControllerRoleServiceImpl implements ControllerRoleService {

    private final static org.slf4j.Logger Logger = LoggerFactory.getLogger(ControllerRoleServiceImpl.class);

    @Autowired
    private WaybillService waybillService;

    @Autowired ProductService productService;

    @Override
    @Transactional
    public void updateWaybillAndProductStatus(Long waybillId, WaybillStatus waybillStatus, ProductStatus productStatus) {
        Waybill waybill = waybillService.getById(waybillId);
        waybill.setStatus(waybillStatus);
        Logger.info("Waybill service_updateWaybillAndProductStatus: updating waybill status from {} to {}", waybill.getStatus(), waybillStatus);
        waybillService.update(waybill);

        Set<ProductInWaybill> productsInWaybill = waybill.getProductInWaybills();
        List<Product> productList = productsInWaybill.stream().map(e -> {
            Product p = e.getProduct();
            p.setStatus(productStatus);
            return p;
        }).collect(Collectors.toList());
        productService.update(productList);
    }
}

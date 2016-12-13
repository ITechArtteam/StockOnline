package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.dto.WaybillPage;
import com.itechart.stockOnline.model.enums.ProductStatus;
import com.itechart.stockOnline.model.enums.WaybillStatus;

public interface WaybillService {
    Waybill getById(Long id);
    Waybill getByNumber(String number);
    WaybillPage getWaybillPage(int pageNumber, int recordCount, String number, String status, String login);
    Waybill update(Waybill waybill);
    void completeWayBillChecking(String waybillNumber, WaybillStatus waybillStatus, ProductStatus productStatus, String userName);
    void setWaybillAndProductsStatus(String waybillNumber, WaybillStatus waybillStatus, ProductStatus productStatus);
    void setWaybillAndProductsStatus(Waybill waybill, WaybillStatus waybillStatus, ProductStatus productStatus);
    Waybill save(Waybill waybill);
}

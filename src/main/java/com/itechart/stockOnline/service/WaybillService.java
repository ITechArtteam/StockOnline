package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.enums.ProductStatus;
import com.itechart.stockOnline.model.enums.WaybillStatus;

public interface WaybillService {
    Waybill getById(Long id);
    Waybill update(Waybill waybill);
    void completeWayBillChecking(Long waybillId, WaybillStatus waybillStatus, ProductStatus productStatus, String userName);
    void setWaybillAndProductsStatus(Long waybillId, WaybillStatus waybillStatus, ProductStatus productStatus);
    void setWaybillAndProductsStatus(Waybill waybill, WaybillStatus waybillStatus, ProductStatus productStatus);
}

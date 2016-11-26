package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.enums.ProductStatus;
import com.itechart.stockOnline.model.enums.WaybillStatus;

public interface ControllerRoleService {
    void updateWaybillAndProductStatus(Long waybillId, WaybillStatus waybillStatus, ProductStatus productStatus);
}

package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.WaybillDao;
import com.itechart.stockOnline.model.Waybill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WaybillServiceImpl implements WaybillService {
    @Autowired
    private WaybillDao waybillDao;

    @Override
    public Waybill getById(Long id) {
        return waybillDao.findOne(id);
    }
}

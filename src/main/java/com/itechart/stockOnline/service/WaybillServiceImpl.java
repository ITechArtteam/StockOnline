package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.WaybillDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Waybill;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WaybillServiceImpl implements WaybillService {

    private final static org.slf4j.Logger Logger = LoggerFactory.getLogger(WaybillServiceImpl.class);

    private final WaybillDao waybillDao;

    @Autowired
    public WaybillServiceImpl(WaybillDao waybillDao) {
        this.waybillDao = waybillDao;
    }

    @Override
    public Waybill getById(Long id) {
        Logger.info("Waybill service: get waybill by id - {}", id);
        return waybillDao.findById(id).orElseThrow(DataNotFoundError::new);
    }
}

package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.WaybillDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Waybill;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        Waybill waybill = waybillDao.findById(id).orElseThrow(DataNotFoundError::new);
        Logger.info("Waybill service: found waybill - {}", waybill);
        return waybill;
    }

    @Override
    @Transactional
    public Waybill update(Waybill waybill) {
        Logger.info("Waybill service: updating entity ({})", waybill);
        return waybillDao.save(waybill);
    }
}

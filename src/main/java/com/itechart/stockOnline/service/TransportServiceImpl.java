package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.TransportDao;
import com.itechart.stockOnline.model.Transport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransportServiceImpl implements TransportService {

    @Autowired
    private TransportDao transportDao;

    @Override
    public Transport save(Transport transport) {
        return transportDao.save(transport);
    }

    @Override
    public Transport getByNumber(String number) {
        return transportDao.findByNumber(number);
    }
}

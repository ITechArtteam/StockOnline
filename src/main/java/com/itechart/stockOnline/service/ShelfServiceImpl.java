package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.ShelfDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Shelf;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShelfServiceImpl implements ShelfService {
    private static final Logger logger = LoggerFactory.getLogger(ShelfServiceImpl.class);

    @Autowired
    private ShelfDao shelfDao;

    @Override
    public Shelf find(Integer id) {
        logger.info("find({})", id);
        Shelf shelf = shelfDao.findById(id).orElseThrow(DataNotFoundError::new);
        logger.info("find({}): found - {}", id, shelf);
        return shelf;
    }

    @Override
    public Shelf save(Shelf shelf) {
        logger.info("save({})", shelf);
        return shelfDao.save(shelf);
    }
}

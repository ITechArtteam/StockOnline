package com.itechart.stockOnline.service;

import com.itechart.stockOnline.converter.StockDtoConverter;
import com.itechart.stockOnline.dao.RoomDao;
import com.itechart.stockOnline.dao.ShelfDao;
import com.itechart.stockOnline.dao.StockDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Room;
import com.itechart.stockOnline.model.Shelf;
import com.itechart.stockOnline.model.dto.stock.StockDto;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Set;

@Service
public class ShelfServiceImpl implements ShelfService {
    private static final Logger logger = LoggerFactory.getLogger(ShelfServiceImpl.class);

    private final StockDtoConverter shelfDtoConverter;
    private ShelfDao shelfDao;
    private final RoomDao roomDao;
    private final StockDao stockDao;



    @Autowired
    public ShelfServiceImpl(ShelfDao shelfDao, RoomDao roomDao,  StockDtoConverter shelfDtoConverter, StockDao stockDao) {
        this.shelfDao = shelfDao;
        this.roomDao = roomDao;
        this.shelfDtoConverter = shelfDtoConverter;
        this.stockDao = stockDao;
    }

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

    @Override
    @Transactional
    public Set<Shelf> saveOrUpdateShelf(Room room) {
        Set<Shelf> shelfs = room.getShelfs();
        if (CollectionUtils.isNotEmpty(shelfs)) {
            for (Shelf shelf : shelfs) {
                shelf.setRoom(room);
                if (shelf.getId() instanceof Integer) {
                    shelf = update(shelf);
                } else {
                    shelf = save(shelf);
                }
            }
        }
        return shelfs;
    }

    @Override
    @Transactional
    public Set<Shelf> getShelfs(Long roomId) {
        Set<Shelf> shelfs = shelfDao.findAllByRoomId(roomId);
        logger.info("Room service: getRooms() | stockId:{}. Rooms: {} records", roomId, shelfs);
        return shelfs;
    }

    @Override
    @Transactional
    public int deleteByIds(Collection<Long> ids) {
        shelfDao.findAllByIdIn(ids).forEach(this::delete);
        logger.info("Room service: delete by ids list - {}. Deleted {} records", ids, ids.size());
        return ids.size();
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        shelfDao.findAllByRoomId(id).forEach(this::delete);
        logger.info("Room service: delete by id - {}. Deleted {} records", id);
    }

    @Override
    @Transactional
    public void delete(Shelf shelf) {
        shelfDao.delete(shelf);
    }

    @Override
    @Transactional
    public Shelf update(Shelf shelf) {

        Shelf shelfInDB =
                shelfDao.findOne(shelf.getId());
        if (shelfInDB == null){
            throw new DataNotFoundError("Stock with id: " + shelf.getId());
        }
        logger.debug("update: \n{} -> \n{}", shelfInDB, shelf);
        updateData(shelf, shelfInDB);

        return shelfInDB;
    }

    private void updateData(Shelf shelf, Shelf InDB) {
        InDB.setNumber(shelf.getNumber());
        InDB.setCapacity(shelf.getCapacity());
        InDB.setFree(shelf.getFree());
    }
}

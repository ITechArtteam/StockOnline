package com.itechart.stockOnline.service;

import com.itechart.stockOnline.converter.StockDtoConverter;
import com.itechart.stockOnline.dao.RoomDao;
import com.itechart.stockOnline.dao.StockDao;
import com.itechart.stockOnline.model.Room;
import com.itechart.stockOnline.model.dto.stock.StockDto;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itechart.stockOnline.exception.DataNotFoundError;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Service
public class RoomServiceImpl implements RoomService{

    private static final Logger logger = LoggerFactory.getLogger(RoomServiceImpl.class);


    private final RoomDao roomDao;
    private final StockDao stockDao;
    private final StockDtoConverter roomDtoConverter;



    @Autowired
    public RoomServiceImpl(RoomDao roomDao,  StockDtoConverter roomDtoConverter, StockDao stockDao) {
        this.roomDao = roomDao;
        this.roomDtoConverter = roomDtoConverter;
        this.stockDao = stockDao;
    }


    @Override
    @Transactional
    public void delete(Room room) {

    }

    @Override
    @Transactional
    public int deleteByIds(Collection<Long> ids) {
        roomDao.findAllByIdIn(ids).forEach(this::delete);
        logger.info("Room service: delete by ids list - {}. Deleted {} records", ids, ids.size());
        return ids.size();
    }

    @Override
    @Transactional
    public Set<Room> saveOrUpdateRoom(StockDto stockDto, Long id) {
        Set<Room> rooms = roomDtoConverter.toRooms(stockDto);
        if (CollectionUtils.isNotEmpty(rooms)) {
            for (Room room : rooms) {
                room.setStock(stockDao.findOne(id));
                if (StringUtils.isNotEmpty(room.getId()+"")) {
                    room = update(room);
                } else {
                    room = saveRoom(room);
                }
            }
        }
        return rooms;
    }

    @Override
    @Transactional
    public Set<Room> getRooms(Long stockId) {
        Set<Room> rooms = roomDao.findAllByStockId(stockId);
        logger.info("Room service: getRooms() | stockId:{}. Rooms: {} records", stockId, rooms);
        return rooms;
    }

    @Override
    @Transactional
    public Room update(Room room) {

        Room roomInDB =
                roomDao.findOne(room.getId());
        if (roomInDB == null){
            throw new DataNotFoundError("Stock with id: " + room.getId());
        }
        logger.debug("update: \n{} -> \n{}", roomInDB, room);
        updateData(room, roomInDB);

        return roomInDB;
    }

    @Override
    @Transactional
    public Room saveRoom(Room room) {
        room.setId(null);
        return roomDao.save(room);
    }



    private void updateData(Room room, Room InDB) {
        InDB.setNumber(room.getNumber());
        InDB.setCost(room.getCost());
        InDB.setStorage(room.getStorage());
    }
}

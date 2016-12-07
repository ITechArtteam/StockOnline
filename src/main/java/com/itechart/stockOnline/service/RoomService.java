package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Room;
import com.itechart.stockOnline.model.dto.stock.StockDto;

import java.util.Collection;
import java.util.Set;


public interface RoomService {
    Room saveRoom(Room room);
    Room update(Room room);
    void delete(Room room);
    int deleteByIds(Collection<Long> ids);
    Set<Room> saveOrUpdateRoom(StockDto stockDto, Long id);
    Set<Room> getRooms(Long stockId);
}

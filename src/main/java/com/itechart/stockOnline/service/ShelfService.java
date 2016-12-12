package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Room;
import com.itechart.stockOnline.model.Shelf;
import com.itechart.stockOnline.model.dto.stock.StockDto;

import java.util.Collection;
import java.util.Set;

public interface ShelfService {
    Shelf find(Integer id);
    Shelf save(Shelf shelf);
    Shelf update(Shelf shelf);
    void delete(Shelf shelf);
    void deleteById(Long id);
    int deleteByIds(Collection<Long> ids);
    Set<Shelf> saveOrUpdateShelf(Room room);
    Set<Shelf> getShelfs(Long roomId);
}

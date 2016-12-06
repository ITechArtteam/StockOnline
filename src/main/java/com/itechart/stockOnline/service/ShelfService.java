package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Shelf;

public interface ShelfService {
    Shelf find(Integer id);
    Shelf save(Shelf shelf);
}

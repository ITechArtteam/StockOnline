package com.itechart.dao;

import com.itechart.model.Shelf;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ShelfDao extends JpaRepository<Shelf, Long> {

}

package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.Shelf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ShelfDao extends JpaRepository<Shelf, Integer>, JpaSpecificationExecutor {

    Optional<Shelf> findById(Integer id);
}

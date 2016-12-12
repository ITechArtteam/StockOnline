package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.Shelf;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

public interface ShelfDao extends JpaRepository<Shelf, Integer>, JpaSpecificationExecutor {

    Optional<Shelf> findById(Integer id);
    Page<Shelf> findAll(Pageable pageable);

    @Modifying
    @Query("delete from Shelf s where s.id in ?1")
    int deleteByIdIn(Collection<Long> ids);

    @Query("select s from Shelf s where s.id in ?1")
    Stream<Shelf> findAllByIdIn(Collection<Long> ids);

    Set<Shelf> findAllByRoomId(Long roomId);
}

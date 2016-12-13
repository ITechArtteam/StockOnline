package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.Room;
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

public interface RoomDao extends JpaRepository<Room, Integer>, JpaSpecificationExecutor{
    Optional<Room> findById(Integer id);
    Page<Room> findAll(Pageable pageable);

    @Modifying
    @Query("delete from Room s where s.id in ?1")
    int deleteByIdIn(Collection<Integer> ids);

    @Query("select s from Room s where s.id in ?1")
    Stream<Room> findAllByIdIn(Collection<Integer> ids);

    Set<Room> findAllByStockId(Long stockId);



}

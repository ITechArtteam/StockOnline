package com.itechart.stockOnline.dao;


import com.itechart.stockOnline.model.Act;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActRepository extends JpaRepository<Act, Long>{
}

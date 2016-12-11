package com.itechart.stockOnline.dao;


import com.itechart.stockOnline.model.Act;
import com.itechart.stockOnline.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ActRepository extends JpaRepository<Act, Long>{
    List<Act> findByUserIdIn(List<Long> usersid);
}

package com.itechart.dao;

import com.itechart.model.Act;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ActDao extends JpaRepository<Act, Long> {
}

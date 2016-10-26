package com.itechart.dao;

import com.itechart.model.StorageRequirement;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StorageRequrementDao extends JpaRepository<StorageRequirement, Long> {
}

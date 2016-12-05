package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.StorageRequirement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StorageRequirementDao extends JpaRepository<StorageRequirement, Long> {
    StorageRequirement findByType(String type);
}

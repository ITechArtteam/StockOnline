package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.StorageRequirement;

public interface StorageRequirementService {
    StorageRequirement get(String type);
    StorageRequirement save(StorageRequirement storageRequirement);
}

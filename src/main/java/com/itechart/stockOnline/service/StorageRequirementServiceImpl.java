package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.StorageRequirementDao;
import com.itechart.stockOnline.model.StorageRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StorageRequirementServiceImpl implements StorageRequirementService{

    @Autowired
    private StorageRequirementDao storageRequirementDao;

    @Override
    public StorageRequirement get(String type) {
        return storageRequirementDao.findByType(type);
    }

    @Override
    public StorageRequirement save(StorageRequirement storageRequirement) {
        return storageRequirementDao.save(storageRequirement);
    }
}

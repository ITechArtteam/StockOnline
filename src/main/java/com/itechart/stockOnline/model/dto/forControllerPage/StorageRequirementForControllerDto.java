package com.itechart.stockOnline.model.dto.forControllerPage;

import com.itechart.stockOnline.model.StorageRequirement;

public class StorageRequirementForControllerDto {
    private String type;

    public StorageRequirementForControllerDto(StorageRequirement storageRequirement) {
        if(storageRequirement != null) {
            this.type = storageRequirement.getType();
        }
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

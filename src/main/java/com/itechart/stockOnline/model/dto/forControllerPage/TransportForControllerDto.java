package com.itechart.stockOnline.model.dto.forControllerPage;

import com.itechart.stockOnline.model.Transport;
import com.itechart.stockOnline.model.enums.TransportType;

public class TransportForControllerDto {
    private String number;
    private TransportType type;
    private StorageRequirementForControllerDto storage;

    public TransportForControllerDto(Transport transport) {
        if(transport != null) {
            this.number = transport.getNumber();
            this.type = transport.getType();
            if(transport.getStorage() != null) {
                this.storage = new StorageRequirementForControllerDto(transport.getStorage());
            }
        }
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public TransportType getType() {
        return type;
    }

    public void setType(TransportType type) {
        this.type = type;
    }

    public StorageRequirementForControllerDto getStorage() {
        return storage;
    }

    public void setStorage(StorageRequirementForControllerDto storage) {
        this.storage = storage;
    }
}

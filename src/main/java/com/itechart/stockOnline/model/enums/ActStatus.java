package com.itechart.stockOnline.model.enums;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;
import com.itechart.stockOnline.exception.UnknownEnumAliasError;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ActStatus {
    SHORTAGE_OF_THE_INVOICE("Недостача по накладной"),
    LOSS_FROM_STOCK("Утерян на складе"),
    STEALING_FROM_THE_STOCK("Украден со склада"),
    CONFISCATED("Конфискован"),
    RECOVER("Утилизирован");

    private String status;

    ActStatus(String status) {
        this.status = status;
    }

    @JsonValue
    public String getStatus() {
        return status;
    }

    public static ActStatus getByAlias(String alias) {
        for (ActStatus actStatus : values()) {
            if(actStatus.getStatus().equalsIgnoreCase(alias))
                return actStatus;
        }
        throw new UnknownEnumAliasError(ActStatus.class, alias);
    }


    @Override
    public String toString() {
        return status;
    }
}

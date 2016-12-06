package com.itechart.stockOnline.model.enums;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;
import com.itechart.stockOnline.exception.UnknownEnumAliasError;

import java.util.ArrayList;
import java.util.List;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ActStatus {
    SHORTAGE_OF_THE_INVOICE(1, "Недостача по накладной"),
    LOSS_FROM_STOCK(2, "Утерян на складе"),
    STEALING_FROM_THE_STOCK(3, "Украден со склада"),
    CONFISCATED(4, "Конфискован"),
    RECOVER(5, "Утилизирован");

    private int id;
    private String status;

    ActStatus(int id, String status) {
        this.id = id;
        this.status = status;
    }

    @JsonValue
    public String getStatus() {
        return status;
    }

    public static ActStatus getByAlias(String alias) {
        for (ActStatus actStatus : values()) {
            if (actStatus.getStatus().equalsIgnoreCase(alias))
                return actStatus;
        }
        throw new UnknownEnumAliasError(ActStatus.class, alias);
    }

    @Override
    public String toString() {
        return status;
    }
}

package com.itechart.stockOnline.model.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;
import com.itechart.stockOnline.exception.UnknownEnumAliasError;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum WaybillStatus {
    JOINED("Зарегистрирована"),
    CHECKING_COMPLETED("Проверка завершена"),
    REGISTRATION_COMPLETED("Оформление завершено"),
    BATCH_FORMED("Партия сформирована"),
    OUTPUT_RESOLVED("Выпуск разрешен"),
    OUT_OF_STOCK("Вывезен со склада");

    private String status;

    WaybillStatus(String status) {
        this.status = status;
    }

    @JsonValue
    public String getStatus() {
        return status;
    }

    public static WaybillStatus getByAlias(String alias) {
        for (WaybillStatus waybillStatus : values()) {
            if(waybillStatus.getStatus().equalsIgnoreCase(alias))
                return waybillStatus;
        }
        throw new UnknownEnumAliasError(WaybillStatus.class, alias);
    }

    @Override
    public String toString() {
        return status;
    }
}

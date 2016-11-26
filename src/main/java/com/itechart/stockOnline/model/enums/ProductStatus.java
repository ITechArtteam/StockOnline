package com.itechart.stockOnline.model.enums;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;
import com.itechart.stockOnline.exception.UnknownEnumAliasError;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ProductStatus {
    JOINED("Зарегистрирован"),
    CHECKING_COMPLETED("Проверка завершена"),
    APPROVED_FOR_STORAGE("Принят на хранение"),
    LOST_CARRIER("Утерян перевозчиком"),
    LOST_FROM_THE_STOCK("Утерян со склада"),
    STEALING_FROM_THE_STOCK("Кража со склада"),
    CARRIER_SHORTAGE("Недостача перевозчика"),
    CONFISCATED("Конфискован"),
    RECOVER("Утилизирован"),
    OUT_OF_STORAGE("Снят с хранения"),
    ISSUE_RESOLVED("Выпуск разрешен"),
    TAKEN_FROM_THE_STOCK("Вывезен со склада");

    private String status;

    ProductStatus(String status) {
        this.status = status;
    }

    @JsonValue
    public String getStatus() {
        return status;
    }

    public static ProductStatus getByAlias(String alias) {
        for (ProductStatus productStatus : values()) {
            if(productStatus.getStatus().equalsIgnoreCase(alias))
                return productStatus;
        }
        throw new UnknownEnumAliasError(ProductStatus.class, alias);
    }


    @Override
    public String toString() {
        return status;
    }
}

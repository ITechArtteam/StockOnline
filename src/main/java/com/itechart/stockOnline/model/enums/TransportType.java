package com.itechart.stockOnline.model.enums;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum TransportType {
    CAR("Автомобиль"),
    TRAIN("Поезд");

    private String type;

    TransportType(String type) {

        this.type = type;
    }

    @JsonValue
    public String getType() {
        return type;
    }

    public static TransportType getByAlias(String alias) {
        for (TransportType transportType : values()) {
            if(transportType.getType().equalsIgnoreCase(alias))
                return transportType;
        }
        throw new IllegalArgumentException();
    }

    @Override
    public String toString() {
        return type;
    }
}

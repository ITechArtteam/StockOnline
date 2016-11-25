package com.itechart.stockOnline.model.enums;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ProductUnit {
    GRAM("г."),
    KILOGRAM("кг."),
    TONNE("т."),
    LITER("л."),
    MILLILITER("мл."),
    CM_CUBE("см. куб.");

    private String unit;

    ProductUnit(String unit) {
        this.unit = unit;
    }

    @JsonValue
    public String getUnit() {
        return unit;
    }

    public static ProductUnit getByAlias(String alias) {
        for (ProductUnit productUnit : values()) {
            if(productUnit.getUnit().equalsIgnoreCase(alias))
                return productUnit;
        }
        throw new IllegalArgumentException();
    }

    @Override
    public String toString() {
        return unit;
    }
}

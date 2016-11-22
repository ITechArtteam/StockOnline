package com.itechart.stockOnline.validation;

import java.lang.annotation.*;

@Target(value = ElementType.FIELD)
@Retention(value = RetentionPolicy.RUNTIME)

public @interface NotNulls {
    NotNull[] value();
}

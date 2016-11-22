package com.itechart.stockOnline.validation;

import java.lang.annotation.*;

@Target(value = ElementType.FIELD)
@Retention(value = RetentionPolicy.RUNTIME)
@Repeatable(Validates.class)
public @interface Validate {
    String name() default "";
    String message() default "";
    Class group() default Default.class;
}

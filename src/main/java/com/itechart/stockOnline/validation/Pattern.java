package com.itechart.stockOnline.validation;

import java.lang.annotation.*;

@Target(value = ElementType.FIELD)
@Retention(value = RetentionPolicy.RUNTIME)
@Repeatable(Patterns.class)
public @interface Pattern {
    String value();
    String name() default "";
    String message() default "";
    Class group() default Default.class;
}

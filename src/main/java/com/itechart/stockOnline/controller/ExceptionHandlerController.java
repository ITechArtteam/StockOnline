package com.itechart.stockOnline.controller;


import com.itechart.stockOnline.exception.ValidationError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Map;

@RestController
public class ExceptionHandlerController {
    private final static Logger LOGGER = LoggerFactory.getLogger(ExceptionHandlerController.class);

    @ExceptionHandler(ValidationError.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String fieldHasErrors(ValidationError error){
        LOGGER.error("fieldHasErrors({})", error.toString());
        return error.getErrors().toString();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String exception(Exception exception){
        LOGGER.error("fieldHasErrors({})", exception.getMessage());
        return "Ошибка на сервере";
    }


}

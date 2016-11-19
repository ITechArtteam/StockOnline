package com.itechart.stockOnline.exception;

import java.util.Map;

public class ValidationError extends RuntimeException {

    private Map<String, String> errors;

    public ValidationError(Map<String, String> errors){
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}

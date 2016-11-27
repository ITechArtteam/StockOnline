package com.itechart.stockOnline.exception;

public class UnknownEnumAliasError extends RuntimeException {
    public UnknownEnumAliasError() {
        super();
    }

    public UnknownEnumAliasError(Class _class, String alias) {
        super(_class.toString() + " can't find enum value with alias '" + alias + "'");
    }
}

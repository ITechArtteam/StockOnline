package com.itechart.stockOnline.exception;

public class DataNotFoundError extends RuntimeException{
    public DataNotFoundError(Throwable e){
        super(e);
    }

    public DataNotFoundError(String msg){
        super(msg);
    }

    public DataNotFoundError(String msg, Throwable e){
        super(msg, e);
    }

    public DataNotFoundError(){
        super();
    }

}

package com.itechart.stockOnline.exception;

public class DataNotFoundError extends RuntimeException{
    public DataNotFoundError(String msg){
        super(msg);
    }
    public DataNotFoundError(){
        super();
    }

}

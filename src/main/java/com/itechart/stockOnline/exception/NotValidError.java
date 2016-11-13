package com.itechart.stockOnline.exception;

import com.itechart.stockOnline.model.dto.OwnerCompanyDto;

public class NotValidError extends RuntimeException{
    private OwnerCompanyDto errorsDto;

    public NotValidError(OwnerCompanyDto errorsDto){
        this.errorsDto = errorsDto;
    }

    public OwnerCompanyDto getErrorsDto() {
        return errorsDto;
    }

}

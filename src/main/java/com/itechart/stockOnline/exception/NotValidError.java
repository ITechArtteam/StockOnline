package com.itechart.stockOnline.exception;

import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.validator.StockOwnerCompanyValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NotValidError extends RuntimeException{
    private static final Logger logger = LoggerFactory.getLogger(StockOwnerCompanyValidator.class);
    private OwnerCompanyDto errorsDto;

    public NotValidError(OwnerCompanyDto errorsDto){
        logger.debug("Input error in ownerCompany. {}", errorsDto);
        this.errorsDto = errorsDto;
    }

    public OwnerCompanyDto getErrorsDto() {
        return errorsDto;
    }

}

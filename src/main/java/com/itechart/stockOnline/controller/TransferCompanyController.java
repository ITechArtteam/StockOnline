package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.TransferCompany;
import com.itechart.stockOnline.model.dto.transfercompany.TransferCompanyDto;
import com.itechart.stockOnline.model.dto.transfercompany.TransferCompanyDtoBuilder;
import com.itechart.stockOnline.service.TransferCompanyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/transfercompanies")
public class TransferCompanyController {

    private static final Logger logger = LoggerFactory.getLogger(TransferCompanyController.class);

    @Autowired
    private TransferCompanyService transferCompanyService;

    @Autowired
    private TransferCompanyDtoBuilder dtoBuilder;

    @RequestMapping(path = "/", method = RequestMethod.GET)
    @ResponseBody
    public List<TransferCompanyDto> getAllTransferCompanies() {
        List<TransferCompany> transferCompanies = transferCompanyService.getAll();

        return dtoBuilder.createDtoList(transferCompanies);
    }

    @RequestMapping(value = "/driver/{driverId}", method = RequestMethod.GET)
    public TransferCompany getDriversTransferCompany(@PathVariable Long driverId){
        TransferCompany transferCompany = transferCompanyService.findByDriverId(driverId);
        logger.debug("GET Path:/getDriversTransferCompany/{} :{}", driverId, transferCompany);
        return transferCompany;
    }

}

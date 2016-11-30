package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.TransferCompany;
import com.itechart.stockOnline.model.dto.transfercompany.TransferCompanyDto;
import com.itechart.stockOnline.model.dto.transfercompany.TransferCompanyDtoBuilder;
import com.itechart.stockOnline.service.TransferCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/transfercompanies")
public class TransferCompanyController {

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
}

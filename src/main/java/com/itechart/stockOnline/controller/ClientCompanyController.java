package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.ClientCompany;
import com.itechart.stockOnline.model.dto.clientcompany.ClientCompanyBuilder;
import com.itechart.stockOnline.model.dto.clientcompany.ClientCompanyDto;
import com.itechart.stockOnline.service.ClientCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/client-companies")
public class ClientCompanyController {

    @Autowired
    private ClientCompanyService clientCompanyService;

    @Autowired
    private ClientCompanyBuilder builder;

    @RequestMapping(path = "/")
    @ResponseBody
    public List<ClientCompany> getAll() {
        return clientCompanyService.getAll();
    }

    @RequestMapping(path = "/register")
    public void register(@RequestBody ClientCompanyDto dto) {
        ClientCompany clientCompany = builder.buildFromDto(dto);
        clientCompanyService.save(clientCompany);
    }
}

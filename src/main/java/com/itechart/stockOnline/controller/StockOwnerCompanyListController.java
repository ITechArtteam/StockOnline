package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.converter.ClientDtoConverter;
import com.itechart.stockOnline.dao.StockOwnerCompanyDao;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.dto.StockOwnerCompanyBriefDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/stockOwners")
public class StockOwnerCompanyListController {
    private final static Logger Logger = LoggerFactory.getLogger(StockOwnerCompanyListController.class);

    @Autowired
    private StockOwnerCompanyDao stockOwnerCompanyDao;

    @Autowired
    private ClientDtoConverter clientDtoConverter;

    @RequestMapping(value = "/page/{pageNumber}/limit/{recordCount}", method = RequestMethod.GET)
    public List<StockOwnerCompanyBriefDto> getClientList(@PathVariable Integer pageNumber, @PathVariable Integer recordCount) {
        Page<StockOwnerCompany> clientCompanyPage = stockOwnerCompanyDao.findAll(new PageRequest(pageNumber, recordCount));
        List<StockOwnerCompanyBriefDto> clientDtoList = new ArrayList<>();
        clientCompanyPage.forEach((stockOwnerCompany) -> clientDtoList.add(clientDtoConverter.toStockOwnerCompanyBriefDto(stockOwnerCompany)));

        StockOwnerCompanyBriefDto d = new StockOwnerCompanyBriefDto();
        d.setName("111");
        clientDtoList.add(d);
        d = new StockOwnerCompanyBriefDto();
        d.setName("222");
        clientDtoList.add(d);
        d = new StockOwnerCompanyBriefDto();
        d.setName("333");
        clientDtoList.add(d);
        return clientDtoList;
    }
}

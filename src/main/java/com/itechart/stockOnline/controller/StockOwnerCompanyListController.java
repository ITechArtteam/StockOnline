package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.converter.ClientDtoConverter;
import com.itechart.stockOnline.dao.StockOwnerCompanyDao;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.dto.StockOwnerCompanyBriefDto;
import com.itechart.stockOnline.model.dto.StockOwnerPage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/stockOwners")
public class StockOwnerCompanyListController {
    private final static Logger LOGGER = LoggerFactory.getLogger(StockOwnerCompanyListController.class);

    @Autowired
    private StockOwnerCompanyDao stockOwnerCompanyDao;

    @Autowired
    private ClientDtoConverter clientDtoConverter;

    @RequestMapping(value = "/page/{pageNumber}/limit/{recordCount}", method = RequestMethod.GET)
    public StockOwnerPage getClientList(@PathVariable Integer pageNumber, @PathVariable Integer recordCount) {
// TODO: 07.11.2016 add pageNumber and recordCount validation
        LOGGER.info("REST request. Path:/stockOwners/page/{}/limit/{}  method: GET", pageNumber, recordCount);
        Page<StockOwnerCompany> clientCompanyPage = stockOwnerCompanyDao.findAll(new PageRequest(pageNumber - 1, recordCount));
        return clientDtoConverter.toStockOwnerPage(clientCompanyPage);
    }

    @RequestMapping(value = "/", method = RequestMethod.DELETE)
    @Transactional
    public ResponseEntity<Object> deleteClients(@RequestParam(value = "namesToDelete") List<String> names) {
        LOGGER.info("REST request. Path:/stockOwners/?namesToDelete={}  method: DELETE", names);
        stockOwnerCompanyDao.deleteByNameIn(names);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

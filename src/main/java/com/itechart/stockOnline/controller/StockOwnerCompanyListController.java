package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.dto.StockOwnerPage;
import com.itechart.stockOnline.service.StockOwnerCompanyService;
import com.itechart.stockOnline.util.ControllerHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/stockOwners")
public class StockOwnerCompanyListController {
    private final static Logger LOGGER = LoggerFactory.getLogger(StockOwnerCompanyListController.class);

    @Autowired
    private StockOwnerCompanyService stockOwnerCompanyService;

    @RequestMapping(value = "/page/{pageNumber}/limit/{recordCount}", method = RequestMethod.GET)
    public StockOwnerPage getClientList(@PathVariable Integer pageNumber,
                                        @PathVariable Integer recordCount,
                                        @RequestParam String name,
                                        @RequestParam String address,
                                        @RequestParam String status) {
        name = ControllerHelper.convertToUtf(name);
        address = ControllerHelper.convertToUtf(address);
        LOGGER.info("REST request. Path:/stockOwners/page/{}/limit/{}/?name={}&address={}&status={}  method: GET", pageNumber, recordCount, name, address, status);
        return stockOwnerCompanyService.getStockOwnersPage(pageNumber, recordCount, name, address, status);
    }

    @RequestMapping(value = "/", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteClients(@RequestParam(value = "namesToDelete") List<String> names) {
        names = names.stream().map(ControllerHelper::convertToUtf).collect(Collectors.toList());
        LOGGER.info("REST request. Path:/stockOwners/?namesToDelete={}  method: DELETE", names);
        int deletedCount = stockOwnerCompanyService.deleteByNames(names);
        return new ResponseEntity<>("Успешно удалено " + deletedCount + " записей", HttpStatus.OK);
    }

    @ExceptionHandler(value = DataNotFoundError.class)
    public ResponseEntity<Object> dataNotFound(){
        return new ResponseEntity<>(
                "Can't get clients list", new HttpHeaders(), HttpStatus.NOT_FOUND);
    }
}

package com.itechart.stockOnline.controller;


import com.itechart.stockOnline.model.dto.stock.StockPage;

import com.itechart.stockOnline.model.Stock;
import com.itechart.stockOnline.model.User;

import com.itechart.stockOnline.exception.DataNotFoundError;

import com.itechart.stockOnline.model.dto.forDistributionGoodsPage.StockForDistributionGoodsDto;
import com.itechart.stockOnline.service.StockService;
import com.itechart.stockOnline.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.itechart.stockOnline.util.ControllerHelper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/stockList")
public class StockListController {
    private final static Logger Logger = LoggerFactory.getLogger(StockListController.class);

    private StockService stockService;

    @Autowired
    private UserService userService;

    @Autowired
    public StockListController(StockService stockService) {
        this.stockService = stockService;
    }

    @RequestMapping(value = "/page/{pageNumber}/limit/{recordCount}", method = RequestMethod.GET)
    public StockPage getStockList(@PathVariable Integer pageNumber,
                                        @PathVariable Integer recordCount,
                                        @RequestParam String name,
                                        @RequestParam String address,
                                  Principal user) {
        name = ControllerHelper.convertToUtf(name);
        address = ControllerHelper.convertToUtf(address);
        Logger.info("REST request. Path:/stockList/page/{}/limit/{}/?name={}&address={}&user={}  method: GET", pageNumber, recordCount, name, address, user.getName());
        return stockService.getStockPage(pageNumber, recordCount, name, address, user.getName());
    }

    @RequestMapping(value = "/byUserCompany", method = RequestMethod.GET)
    public List<StockForDistributionGoodsDto> getStockList(Principal userInfo) {
        Logger.info("REST request. Path:/stockList/byUserCompany  method: GET user {}", userInfo.getName());
        User user = userService.findByLogin(userInfo.getName());
        if(user.getStockOwnerCompany() == null) {
            Logger.info("REST request handler for Path:/stockList/byUserCompany: stockOwnerCompany not found for user {}", user.getLogin());
            throw new DataNotFoundError();
        }
        List<Stock> stockList = stockService.getByCompanyId(user.getStockOwnerCompany().getId());
        return stockList
                .stream()
                .map(StockForDistributionGoodsDto::new)
                .collect(Collectors.toList());
    }

    @RequestMapping(value = "/", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteStocks(@RequestParam(value = "idsToDelete") List<Long> ids) {
        Logger.info("REST request. Path:/stockList/?idsToDelete={}  method: DELETE", ids);
        long deletedCount = stockService.deleteByIds(ids);
        return new ResponseEntity<>("Успешно удалено " + deletedCount + " записей", HttpStatus.OK);
    }

    @ExceptionHandler(value = DataNotFoundError.class)
    public ResponseEntity<Object> dataNotFound(){
        return new ResponseEntity<>(
                "Can't get stocks list", new HttpHeaders(), HttpStatus.NOT_FOUND);
    }
}
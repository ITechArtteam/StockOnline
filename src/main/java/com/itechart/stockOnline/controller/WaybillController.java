package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.service.WaybillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/waybills")
public class WaybillController {

    private final static org.slf4j.Logger Logger = LoggerFactory.getLogger(WaybillController.class);

    private final WaybillService waybillService;

    @Autowired
    public WaybillController(WaybillService waybillService) {
        this.waybillService = waybillService;
    }

    @RequestMapping(value = "/{id}")
    public Waybill getById(@PathVariable Long id) {
        Logger.info("REST request. Path:/waybills/{}  method: GET", id);
        return waybillService.getById(id);
    }
}

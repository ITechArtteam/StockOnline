package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.service.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/waybills")
public class WaybillController {
    @Autowired
    private WaybillService waybillService;

    @RequestMapping(value = "/{id}")
    public Waybill getById(@PathVariable Long id) {
        return waybillService.getById(id);
    }
}

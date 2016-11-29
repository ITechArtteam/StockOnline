package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.dto.waybillregistration.WaybillRegistrationDto;
import com.itechart.stockOnline.service.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/waybills")
public class WaybillController {
    @Autowired
    private WaybillService waybillService;

    @RequestMapping(value = "/{id}")
    public Waybill getById(@PathVariable Long id) {
        return waybillService.getById(id);
    }

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public void register(@RequestBody WaybillRegistrationDto registrationDto) {

    }
}

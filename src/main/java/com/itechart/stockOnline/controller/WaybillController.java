package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.dto.waybillregistration.WaybillBuilder;
import com.itechart.stockOnline.model.dto.waybillregistration.WaybillRegistrationDto;
import com.itechart.stockOnline.model.enums.WaybillStatus;
import com.itechart.stockOnline.service.WaybillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping(value = "/waybills")
public class WaybillController {

    private static final Logger logger = LoggerFactory.getLogger(WaybillController.class);

    @Autowired
    private WaybillBuilder waybillBuilder;

    @Autowired
    private WaybillService waybillService;

    @RequestMapping(value = "/{id}")
    public Waybill getById(@PathVariable Long id) {
        return waybillService.getById(id);
    }

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public void register(@RequestBody WaybillRegistrationDto registrationDto)
            throws ParseException {

        Waybill waybill = waybillBuilder.buildFromDto(registrationDto);
        waybill.setStatus(WaybillStatus.JOINED);

        waybillService.save(waybill);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void handleException(Exception exception) {
        logger.error("Error occurred: {}", exception.getMessage());
    }
}

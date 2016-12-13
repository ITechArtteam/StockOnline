package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.dto.WaybillPage;
import com.itechart.stockOnline.model.dto.waybillregistration.WaybillBuilder;
import com.itechart.stockOnline.model.dto.waybillregistration.WaybillRegistrationDto;
import com.itechart.stockOnline.service.WaybillService;
import com.itechart.stockOnline.util.ControllerHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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

    @RequestMapping(value = "/page/{pageNumber}/limit/{recordCount}", method = RequestMethod.GET)
    public WaybillPage getWaybillPage(@PathVariable Integer pageNumber,
                                      @PathVariable Integer recordCount,
                                      @RequestParam String number,
                                      @RequestParam String status,
                                      Principal user) {
        number = ControllerHelper.convertToUtf(number);
        logger.info("REST request. Path:/waybills/page/{}/limit/{}/?number={}&status={}&user={}  method: GET", pageNumber, recordCount, number, status, user.getName());
        return waybillService.getWaybillPage(pageNumber, recordCount, number, status, user.getName());
    }

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    @Transactional
    public void register(@RequestBody WaybillRegistrationDto registrationDto)
            throws ParseException {

        Waybill waybill = waybillBuilder.buildFromDto(registrationDto);

        waybillService.save(waybill);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void handleException(Exception exception) {
        logger.error("Error occurred: {}", exception);
    }
}

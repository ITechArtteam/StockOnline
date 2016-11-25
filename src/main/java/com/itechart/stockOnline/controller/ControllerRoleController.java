package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.dto.forControllerPage.WaybillForControllerDto;
import com.itechart.stockOnline.service.WaybillService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/controller/waybills")
public class ControllerRoleController {

    private final static org.slf4j.Logger Logger = LoggerFactory.getLogger(ControllerRoleController.class);

    private final WaybillService waybillService;

    @Autowired
    public ControllerRoleController(WaybillService waybillService) {
        this.waybillService = waybillService;
    }

    @RequestMapping(value = "/{id}")
    public WaybillForControllerDto getById(@PathVariable Long id) {
        Logger.info("REST request. Path:/controller/waybills/{}  method: GET", id);
        return new WaybillForControllerDto(waybillService.getById(id));
    }

    @ExceptionHandler(value = DataNotFoundError.class)
    public ResponseEntity<Object> handleNotFound() {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

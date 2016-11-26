package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Product;
import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.dto.AcceptWaybillDto;
import com.itechart.stockOnline.model.dto.forControllerPage.WaybillForControllerDto;
import com.itechart.stockOnline.model.enums.ProductStatus;
import com.itechart.stockOnline.model.enums.WaybillStatus;
import com.itechart.stockOnline.service.ControllerRoleService;
import com.itechart.stockOnline.service.WaybillService;
import com.itechart.stockOnline.util.ControllerHelper;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/controller/waybills")
public class ControllerRoleController {

    private final static org.slf4j.Logger Logger = LoggerFactory.getLogger(ControllerRoleController.class);

    private final WaybillService waybillService;

    private final ControllerRoleService controllerRoleService;

    @Autowired
    public ControllerRoleController(WaybillService waybillService, ControllerRoleService controllerRoleService) {
        this.waybillService = waybillService;
        this.controllerRoleService = controllerRoleService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public WaybillForControllerDto getById(@PathVariable Long id) {
        Logger.info("REST request. Path:/controller/waybills/{}  method: GET", id);
        return new WaybillForControllerDto(waybillService.getById(id));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updateWaybillStatus(@PathVariable Long id,
                                                      @RequestBody AcceptWaybillDto acceptWaybillDto) {
        Logger.info("REST request. Path:/controller/waybills/{}/?waybillStatus={}&productStatus={}  method: PUT", id, acceptWaybillDto.getWaybillStatus(), acceptWaybillDto.getWaybillStatus());
        WaybillStatus waybillStatusEnum = WaybillStatus.getByAlias(acceptWaybillDto.getWaybillStatus());
        ProductStatus productStatusEnum = ProductStatus.getByAlias(acceptWaybillDto.getProductStatus());
        controllerRoleService.completeWaybillChecking(id, waybillStatusEnum, productStatusEnum);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler(value = DataNotFoundError.class)
    public ResponseEntity<Object> handleNotFound(DataNotFoundError error) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalStatus(IllegalAccessException e) {
        return new ResponseEntity<>("Указан неизвестный статус накладной или товара", HttpStatus.BAD_REQUEST);
    }
}

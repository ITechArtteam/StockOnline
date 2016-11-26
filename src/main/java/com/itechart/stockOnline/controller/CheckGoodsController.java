package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.UnknownEnumAliasError;
import com.itechart.stockOnline.model.dto.AcceptWaybillDto;
import com.itechart.stockOnline.model.dto.forControllerPage.WaybillForControllerDto;
import com.itechart.stockOnline.model.enums.ProductStatus;
import com.itechart.stockOnline.model.enums.WaybillStatus;
import com.itechart.stockOnline.service.WaybillService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(value = "/checkgoods")
public class CheckGoodsController {

    private final static org.slf4j.Logger Logger = LoggerFactory.getLogger(CheckGoodsController.class);

    private final WaybillService waybillService;


    @Autowired
    public CheckGoodsController(WaybillService waybillService) {
        this.waybillService = waybillService;
    }

    @RequestMapping(value = "/waybills/{id}", method = RequestMethod.GET)
    public WaybillForControllerDto getById(@PathVariable Long id) {
        Logger.info("REST request. Path:/checkgoods/waybills/{}  method: GET", id);
        return new WaybillForControllerDto(waybillService.getById(id));
    }

    @RequestMapping(value = "/controller/waybills/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> confirmWaybill(@PathVariable Long id,
                                                      @RequestBody AcceptWaybillDto acceptWaybillDto,
                                                      Principal user) {
        Logger.info("REST request. Path:/checkgoods/controller/waybills/{}/?waybillStatus={}&productStatus={}  method: PUT", id, acceptWaybillDto.getWaybillStatus(), acceptWaybillDto.getWaybillStatus());
        WaybillStatus waybillStatusEnum = WaybillStatus.getByAlias(acceptWaybillDto.getWaybillStatus());
        ProductStatus productStatusEnum = ProductStatus.getByAlias(acceptWaybillDto.getProductStatus());
        waybillService.completeWayBillChecking(id, waybillStatusEnum, productStatusEnum, user.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/dispatcher/waybills/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> resolveOutput(@PathVariable Long id,
                                                      @RequestBody AcceptWaybillDto acceptWaybillDto) {
        Logger.info("REST request. Path:/checkgoods/dispatcher/waybills/{}/?waybillStatus={}&productStatus={}  method: PUT", id, acceptWaybillDto.getWaybillStatus(), acceptWaybillDto.getWaybillStatus());
        WaybillStatus waybillStatusEnum = WaybillStatus.getByAlias(acceptWaybillDto.getWaybillStatus());
        ProductStatus productStatusEnum = ProductStatus.getByAlias(acceptWaybillDto.getProductStatus());
        waybillService.setWaybillAndProductsStatus(id, waybillStatusEnum, productStatusEnum);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler(value = DataNotFoundError.class)
    public ResponseEntity<Object> handleNotFound(DataNotFoundError error) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = UnknownEnumAliasError.class)
    public ResponseEntity<Object> handleIllegalStatus(UnknownEnumAliasError error) {
        Logger.info("UnknownEnumAliasError handler: {}", error.getMessage());
        return new ResponseEntity<>("Указан неизвестный статус накладной или товара", HttpStatus.BAD_REQUEST);
    }
}

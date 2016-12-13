package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.UnknownEnumAliasError;
import com.itechart.stockOnline.model.Act;
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

    @RequestMapping(value = "/waybills/{number}", method = RequestMethod.GET)
    public WaybillForControllerDto getByNumber(@PathVariable String number) {
        Logger.info("REST request. Path:/checkgoods/waybills/{}  method: GET", number);
        return new WaybillForControllerDto(waybillService.getByNumber(number));
    }

    @RequestMapping(value = "/controller/waybills/{number}", method = RequestMethod.PUT)
    public ResponseEntity<Object> confirmWaybill(@PathVariable String number,
                                                      @RequestBody Holder holder,
                                                      Principal user) {
        Logger.info("REST request. Path:/checkgoods/controller/waybills/{}/?waybillStatus={}&productStatus={}  method: PUT", number, holder.getAcceptWaybillDto().getWaybillStatus(), holder.getAcceptWaybillDto().getWaybillStatus());
        WaybillStatus waybillStatusEnum = WaybillStatus.getByAlias(holder.getAcceptWaybillDto().getWaybillStatus());
        ProductStatus productStatusEnum = ProductStatus.getByAlias(holder.getAcceptWaybillDto().getProductStatus());
        waybillService.completeWayBillChecking(number, waybillStatusEnum, productStatusEnum, user.getName(), holder.getAct());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public static class Holder{
        private AcceptWaybillDto acceptWaybillDto;
        private Act act;

        public Holder(AcceptWaybillDto acceptWaybillDto, Act act) {
            this.acceptWaybillDto = acceptWaybillDto;
            this.act = act;
        }

        public Holder() {
        }

        public AcceptWaybillDto getAcceptWaybillDto() {
            return acceptWaybillDto;
        }

        public void setAcceptWaybillDto(AcceptWaybillDto acceptWaybillDto) {
            this.acceptWaybillDto = acceptWaybillDto;
        }

        public Act getAct() {
            return act;
        }

        public void setAct(Act act) {
            this.act = act;
        }
    }

    @RequestMapping(value = "/dispatcher/waybills/{number}", method = RequestMethod.PUT)
    public ResponseEntity<Object> resolveOutput(@PathVariable String number,
                                                      @RequestBody AcceptWaybillDto acceptWaybillDto) {
        Logger.info("REST request. Path:/checkgoods/dispatcher/waybills/{}/?waybillStatus={}&productStatus={}  method: PUT", number, acceptWaybillDto.getWaybillStatus(), acceptWaybillDto.getWaybillStatus());
        WaybillStatus waybillStatusEnum = WaybillStatus.getByAlias(acceptWaybillDto.getWaybillStatus());
        ProductStatus productStatusEnum = ProductStatus.getByAlias(acceptWaybillDto.getProductStatus());
        waybillService.setWaybillAndProductsStatus(number, waybillStatusEnum, productStatusEnum);
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

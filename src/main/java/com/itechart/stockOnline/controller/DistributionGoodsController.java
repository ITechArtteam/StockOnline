package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.dto.forControllerPage.WaybillForControllerDto;
import com.itechart.stockOnline.model.dto.forDistributionGoodsPage.ProductForDistributionGoodsFinishDto;
import com.itechart.stockOnline.service.DistributionGoodsService;
import com.itechart.stockOnline.service.WaybillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/distributionGoods")
public class DistributionGoodsController {
    private static final Logger logger = LoggerFactory.getLogger(DistributionGoodsController.class);

    @Autowired
    private DistributionGoodsService distributionGoodsService;

    @Autowired
    private WaybillService waybillService;


    @RequestMapping(value = "/waybills/{number}", method = RequestMethod.GET)
    public WaybillForControllerDto getByNumber(@PathVariable String number) {
        logger.info("REST request. Path:/distributionGoods/waybills/{}  method: GET", number);
        WaybillForControllerDto waybillForControllerDto = new WaybillForControllerDto(waybillService.getByNumber(number));
        waybillForControllerDto.getProductInWaybills().forEach(productInWaybillForControllerDto -> {
            int productCount = productInWaybillForControllerDto.getProduct().getCount();
            productInWaybillForControllerDto.setCount(productCount);
        });
        return waybillForControllerDto;
    }

    @RequestMapping(value = "/finish", method = RequestMethod.POST)
    public ResponseEntity<Object> distributionGoodsFinish(@RequestBody List<ProductForDistributionGoodsFinishDto> productList,
                                                            Principal user) {
        logger.info("REST request. Path:/distributionGoods/finish/{} method: POST", productList);
        distributionGoodsService.finishDistribution(productList, user.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

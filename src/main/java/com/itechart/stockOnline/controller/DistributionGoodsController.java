package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.dto.forDistributionGoodsPage.ProductForDistributionGoodsFinishDto;
import com.itechart.stockOnline.service.DistributionGoodsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/distributionGoods")
public class DistributionGoodsController {
    private static final Logger logger = LoggerFactory.getLogger(DistributionGoodsController.class);

    @Autowired
    private DistributionGoodsService distributionGoodsService;

    @RequestMapping(value = "/finish", method = RequestMethod.POST)
    public ResponseEntity<Object> distributionGoodsFinish(@RequestBody List<ProductForDistributionGoodsFinishDto> productList,
                                                            Principal user) {
        logger.info("REST request. Path:/distributionGoods/finish/{} method: POST", productList);
        distributionGoodsService.finishDistribution(productList, user.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

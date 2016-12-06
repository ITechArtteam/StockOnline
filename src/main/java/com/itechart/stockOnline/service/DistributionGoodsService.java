package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.dto.forDistributionGoodsPage.ProductForDistributionGoodsFinishDto;

import java.util.List;

public interface DistributionGoodsService {
    void finishDistribution(List<ProductForDistributionGoodsFinishDto> productList, String userLogin);
}

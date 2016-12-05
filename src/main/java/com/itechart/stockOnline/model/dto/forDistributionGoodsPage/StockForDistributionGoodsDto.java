package com.itechart.stockOnline.model.dto.forDistributionGoodsPage;

import com.itechart.stockOnline.model.Stock;

public class StockForDistributionGoodsDto {
    private Long id;
    private String name;

    public StockForDistributionGoodsDto(Stock stock) {
        this.id = stock.getId();
        this.name = stock.getName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

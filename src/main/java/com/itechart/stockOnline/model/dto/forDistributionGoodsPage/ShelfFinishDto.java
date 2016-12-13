package com.itechart.stockOnline.model.dto.forDistributionGoodsPage;

public class ShelfFinishDto {
    private Integer shelfId;
    private Integer count;

    public ShelfFinishDto() {
    }

    public ShelfFinishDto(Integer shelfId, Integer count) {
        this.shelfId = shelfId;
        this.count = count;
    }

    public Integer getShelfId() {
        return shelfId;
    }

    public void setShelfId(Integer shelfId) {
        this.shelfId = shelfId;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}

package com.itechart.stockOnline.model.dto.forDistributionGoodsPage;

import com.itechart.stockOnline.model.Stock;

import java.util.Set;
import java.util.stream.Collectors;

public class StockForDistributionGoodsDto {
    private Long id;
    private String name;
    private Set<RoomForDistributionGoodsDto> rooms;

    public StockForDistributionGoodsDto(Stock stock) {
        this.id = stock.getId();
        this.name = stock.getName();
        if(stock.getRooms() != null) {
            rooms = stock.getRooms()
                    .stream()
                    .map(RoomForDistributionGoodsDto::new)
                    .collect(Collectors.toSet());
        }
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

    public Set<RoomForDistributionGoodsDto> getRooms() {
        return rooms;
    }

    public void setRooms(Set<RoomForDistributionGoodsDto> rooms) {
        this.rooms = rooms;
    }
}

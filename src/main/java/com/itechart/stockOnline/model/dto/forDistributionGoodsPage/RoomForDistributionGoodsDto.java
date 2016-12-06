package com.itechart.stockOnline.model.dto.forDistributionGoodsPage;

import com.itechart.stockOnline.model.Room;
import com.itechart.stockOnline.model.dto.forControllerPage.StorageRequirementForControllerDto;

import java.util.Set;
import java.util.stream.Collectors;

public class RoomForDistributionGoodsDto {
    private Long id;
    private String number;
    private StorageRequirementForControllerDto storage;
    private Set<ShelfForDistributionGoodsDto> shelves;

    public RoomForDistributionGoodsDto(Room room) {
        this.id = room.getId();
        this.number = room.getNumber();
        if(room.getStorage() != null) {
            this.storage = new StorageRequirementForControllerDto(room.getStorage());
        }
        if(room.getShelfs() != null) {
            shelves = room.getShelfs()
                    .stream()
                    .map(ShelfForDistributionGoodsDto::new)
                    .collect(Collectors.toSet());
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public StorageRequirementForControllerDto getStorage() {
        return storage;
    }

    public void setStorage(StorageRequirementForControllerDto storage) {
        this.storage = storage;
    }

    public Set<ShelfForDistributionGoodsDto> getShelves() {
        return shelves;
    }

    public void setShelves(Set<ShelfForDistributionGoodsDto> shelves) {
        this.shelves = shelves;
    }
}

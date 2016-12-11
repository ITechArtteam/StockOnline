package com.itechart.stockOnline.model.dto.stock;


import java.util.Set;

public class RoomDto {

    private Boolean isisOpen = false;
    private Long id;
    private Double cost;
    private String number;
    private String storage;
    private String selectedShelfName;
    private Set<ShelfDto> shelfs;


    public RoomDto() {
    }
    @Deprecated
    public Boolean getIsisOpen() { return isisOpen; }
    @Deprecated
    public void setIsisOpen(Boolean isisOpen) { this.isisOpen = isisOpen; }

    @Deprecated
    public String getSelectedShelfName() { return selectedShelfName; }
    @Deprecated
    public void setSelectedShelfName(String selectedShelfName) { this.selectedShelfName = selectedShelfName; }

    public Boolean getisOpen() { return isisOpen; }
    public void setisOpen(Boolean open) { isisOpen = open; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getCost() {return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public String getStorage() { return storage; }
    public void setStorage(String storage) { this.storage = storage; }

    public Set<ShelfDto> getShelfs() { return shelfs; }
    public void setShelfs(Set<ShelfDto> shelfs) { this.shelfs = shelfs; }

    @Override
    public String toString() {
        return "RoomDto{" +
                "isisOpen=" + isisOpen +
                ", id=" + id +
                ", cost=" + cost +
                ", number='" + number + '\'' +
                ", storage='" + storage + '\'' +
                ", shelfs=" + shelfs +
                '}';
    }
}

package com.itechart.stockOnline.model.dto.stock;


public class RoomDto {

    private Long id;
    private Double cost;
    private String number;
    private String storage;

    public RoomDto() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getCost() {return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public String getStorage() { return storage; }
    public void setStorage(String storage) { this.storage = storage; }

    @Override
    public String toString() {
        return "RoomDto{" +
                "id=" + id +
                ", cost=" + cost +
                ", number='" + number + '\'' +
                ", storage='" + storage + '\'' +
                '}';
    }
}

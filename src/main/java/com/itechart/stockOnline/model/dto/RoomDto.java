package com.itechart.stockOnline.model.dto;


public class RoomDto {

    private Long id;
    private Integer cost;
    private String number;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getCost() {return cost; }
    public void setCost(Integer cost) { this.cost = cost; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    @Override
    public String toString() {
        return "RoomDto{" +
                "id=" + id +
                ", cost=" + cost +
                ", number='" + number + '\'' +
                '}';
    }
}

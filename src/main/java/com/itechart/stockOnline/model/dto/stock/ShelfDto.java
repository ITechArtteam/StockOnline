package com.itechart.stockOnline.model.dto.stock;


public class ShelfDto {
    private Boolean isisOpen = false;
    private String number;
    private Integer capacity;
    private Boolean isisFree;
    private Long id;

    public ShelfDto() {
    }

    public Boolean getIsisOpen() { return isisOpen; }
    public void setIsisOpen(Boolean isisOpen) { this.isisOpen = isisOpen; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public Boolean getIsisFree() { return isisFree; }
    public void setIsisFree(Boolean isisFree) { this.isisFree = isisFree; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    @Override
    public String toString() {
        return "ShelfDto{" +
                "isisOpen=" + isisOpen +
                ", number='" + number + '\'' +
                ", capacity=" + capacity +
                ", isisFree=" + isisFree +
                ", id=" + id +
                '}';
    }
}

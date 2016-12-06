package com.itechart.stockOnline.model.dto.stock;

import com.itechart.stockOnline.model.dto.stock.RoomDto;
import java.util.Set;


public class StockRoomsDto {
    private String selectedRoomName;
    private Set<RoomDto> rooms;

    public StockRoomsDto(Set<RoomDto> rooms) {
        this.rooms = rooms;
    }

    public StockRoomsDto() {
    }

    public String getSelectedRoomName() { return selectedRoomName; }
    public void setSelectedRoomName(String selectedRoomName) { this.selectedRoomName = selectedRoomName; }

    public Set<RoomDto> getRooms() { return rooms; }
    public void setRooms(Set<RoomDto> rooms) { this.rooms = rooms; }

    @Override
    public String toString() {
        return "StockRoomsDto{" +
                "selectedRoomName='" + selectedRoomName + '\'' +
                ", rooms=" + rooms +
                '}';
    }
}

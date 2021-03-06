package com.itechart.stockOnline.converter;

import com.itechart.stockOnline.model.*;
import com.itechart.stockOnline.model.dto.stock.*;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class StockDtoConverter {

    private final static Logger LOGGER = LoggerFactory.getLogger(StockDtoConverter.class);

    public Stock toStock(StockDto stockDto){

        Stock stock = new Stock();
        Address address = new Address();
        address.setCountryName(stockDto.getCountry());
        address.setCityName(stockDto.getCity());
        address.setStreet(stockDto.getStreet());
        address.setHome(stockDto.getHome());
        stock.setAddress(address);
        stock.setId(stockDto.getId());
        stock.setName(stockDto.getName());
        stock.setCompany(new StockOwnerCompany(stockDto.getNameCompany()));
        Set<Room> rooms = toRooms(stockDto);
        if(CollectionUtils.isNotEmpty(rooms)){
            stock.setRooms(rooms);
        }
        LOGGER.info("toStock: stockDto:{}, address:{}, stock:{}",stockDto,address,stock);
        return stock;
    }

    public StockDto toStockDto(Stock stock, User admin) {
        StockDto dto = new StockDto();
        dto.setId(stock.getId());
        Address address = stock.getAddress();
        dto.setCountry(address.getCountryName());
        dto.setCity(address.getCityName());
        dto.setStreet(address.getStreet());
        dto.setHome(address.getHome());
        dto.setName(stock.getName());
        dto.setStockRooms(new StockRoomsDto(new ValidationRooms("","","","")));
        dto.setNameCompany(stock.getCompany().getName());
        Set<RoomDto> roomsDto = new HashSet<RoomDto>();
        if(CollectionUtils.isNotEmpty(stock.getRooms())){
            for( Room room: stock.getRooms()){
                RoomDto roomDto = toRoomDto(room);
                roomsDto.add(roomDto);
            }
            dto.setStockRooms(new StockRoomsDto(roomsDto));
        }
        LOGGER.info("toStockDto: stock:{}, address:{}, stockDto:{}",stock,address,dto);
        return dto;
    }

    public RoomDto toRoomDto(Room room) {
        RoomDto roomDto = new RoomDto();
        roomDto.setIdRoom(room.getId());
        roomDto.setCost(room.getCost());
        roomDto.setNumber(room.getNumber());
        roomDto.setStorage(room.getStorage().getType());
        roomDto.setValidationErrors(new ValidationShelf("","",""));
        Set<Shelf> shelfs = room.getShelfs();
        if(CollectionUtils.isNotEmpty(shelfs)){
            Set<ShelfDto> shelfDtos = new HashSet<ShelfDto>();
            for (Shelf shelf: shelfs){
               ShelfDto shelfDto = new ShelfDto();
                shelfDto.setCapacity(shelf.getCapacity());
                shelfDto.setIdShelf(shelf.getId());
                shelfDto.setIsFree(shelf.getFree());
                shelfDto.setNumber(shelf.getNumber());
                shelfDtos.add(shelfDto);
            }
            roomDto.setShelfs(shelfDtos);
        }
        return roomDto;
    }

    public Set<Room> toRooms(StockDto stockDto){

        Set<Room> rooms = new HashSet<Room>();
        Set<RoomDto> roomsDto = stockDto.getStockRooms().getRooms();
        if(CollectionUtils.isNotEmpty(roomsDto)){
            for (RoomDto roomDto: roomsDto){
                Room room = new Room();
                room.setId(roomDto.getIdRoom());
                room.setCost(roomDto.getCost());
                room.setNumber(roomDto.getNumber());
                room.setStorage(new StorageRequirement(roomDto.getStorage()));
                Set<ShelfDto> shelfsDto = roomDto.getShelfs();
                if(CollectionUtils.isNotEmpty(shelfsDto)){
                    Set<Shelf> shelfs = new HashSet<Shelf>();
                    for (ShelfDto shelfDto: shelfsDto){
                        Shelf shelf = new Shelf();
                        shelf.setId(shelfDto.getIdShelf());
                        shelf.setNumber(shelfDto.getNumber());
                        shelf.setCapacity(shelfDto.getCapacity());
                        shelf.setFree(shelfDto.getIsFree());
                        shelfs.add(shelf);
                    }
                    room.setShelfs(shelfs);
                }
                rooms.add(room);
            }
        }

        LOGGER.info("toRooms:  rooms:{}",rooms);
        return rooms;
    }

    public Set<RoomDto> toRoomsDto(Stock stock){

        Set<RoomDto> roomsDto = new HashSet<RoomDto>();
        if (CollectionUtils.isNotEmpty(stock.getRooms())){
            for (Room room: stock.getRooms()){
                RoomDto roomDto = new RoomDto();
                roomDto.setIdRoom(room.getId());
                roomDto.setCost(room.getCost());
                roomDto.setNumber(room.getNumber());
                roomDto.setStorage(room.getStorage().getType());
                roomsDto.add(roomDto);
            }
        }

        LOGGER.info("toRoomsDto:  roomsDto:{}",roomsDto);
        return roomsDto;
    }

    public StockDto toStockDto(Stock stock) {
        StockDto dto = new StockDto();
        dto.setId(stock.getId());
        Address address = stock.getAddress();
        dto.setCountry(address.getCountryName());
        dto.setCity(address.getCityName());
        dto.setStreet(address.getStreet());
        dto.setHome(address.getHome());
        dto.setName(stock.getName());
        dto.setNameCompany(stock.getCompany().getName());
        dto.setStockRooms(new StockRoomsDto(toRoomsDto(stock)));
        LOGGER.info("toStockDto: stock:{}, address:{}, stockDto:{}",stock,address,dto);
        return dto;
    }

    public StockPage toStockPage(Page<Stock> page) {
        StockPage result = new StockPage();
        result.setActivePage(page.getNumber() + 1);
        result.setItemsCountPerPage(page.getSize());
        result.setTotalItemsCount(page.getTotalElements());

        List<StockDto> stockDtoList = new ArrayList<>();
        page.forEach((stock) -> stockDtoList.add(toStockDto(stock)));

        result.setStockList(stockDtoList);
        LOGGER.info("toStockPage: page:{}, stockPage:{}, stockDto:{}",page,result,stockDtoList);
        return result;
    }

}

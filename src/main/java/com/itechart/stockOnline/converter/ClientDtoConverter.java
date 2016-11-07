package com.itechart.stockOnline.converter;

import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.dto.ClientDto;
import org.springframework.stereotype.Component;

@Component
public class ClientDtoConverter {

    public StockOwnerCompany toStockOwnerCompany(ClientDto clientDto){
        StockOwnerCompany company = new StockOwnerCompany();
        User admin = new User();
        admin.setLogin(clientDto.getAdminLogin());
        admin.setPassword(clientDto.getAdminPassword());
        admin.setEmail(clientDto.getAdminEmail());
        company.setAdmin(admin);
        Address address = new Address();
        address.setCountryName(clientDto.getCountry());
        address.setCityName(clientDto.getCity());
        address.setStreet(clientDto.getStreet());
        address.setHome(clientDto.getHome());
        address.setRoom(clientDto.getRoom());
        company.setAddress(address);
        company.setName(clientDto.getName());
        return company;
    }

    public ClientDto toClientDto(StockOwnerCompany company) {
        ClientDto dto = new ClientDto();
        dto.setName(company.getName());
        Address address = company.getAddress();
        dto.setCountry(address.getCountryName());
        dto.setCity(address.getCityName());
        dto.setStreet(address.getStreet());
        dto.setHome(address.getHome());
        dto.setRoom(address.getRoom());
        User admin = company.getAdmin();
        dto.setAdminLogin(admin.getLogin());
        dto.setAdminEmail(admin.getEmail());
        dto.setAdminPassword(null);
        return dto;
    }

}

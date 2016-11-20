package com.itechart.stockOnline.converter;

import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import com.itechart.stockOnline.model.dto.StockOwnerCompanyBriefDto;
import com.itechart.stockOnline.model.dto.StockOwnerPage;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class OwnerCompanyDtoConverter {

    public StockOwnerCompany toStockOwnerCompany(OwnerCompanyDto ownerCompanyDto){
        StockOwnerCompany company = new StockOwnerCompany();
        Address address = new Address();
        address.setCountryName(ownerCompanyDto.getCountry());
        address.setCityName(ownerCompanyDto.getCity());
        address.setStreet(ownerCompanyDto.getStreet());
        try {
            if (StringUtils.isNotEmpty(ownerCompanyDto.getHome())) {
                address.setHome(Integer.parseInt(ownerCompanyDto.getHome()));
            }
        } catch (NumberFormatException e){
            Map<String, String> errors = new HashMap<>();
            errors.put("home", "Только числа");
            throw new ValidationError(errors);
        }
        try {
            if (StringUtils.isNotEmpty(ownerCompanyDto.getRoom())) {
                address.setRoom(Integer.parseInt(ownerCompanyDto.getRoom()));
            }
        } catch (NumberFormatException e){
            Map<String, String> errors = new HashMap<>();
            errors.put("room", "Только числа");
            throw new ValidationError(errors);
        }
        company.setAddress(address);
        company.setName(ownerCompanyDto.getName());
        company.setId(ownerCompanyDto.getId());
        return company;
    }

    public User toUser(OwnerCompanyDto ownerCompanyDto){
        User admin = new User();
        admin.setLogin(ownerCompanyDto.getAdminLogin());
        admin.setPassword(ownerCompanyDto.getAdminPassword());
        admin.setEmail(ownerCompanyDto.getAdminEmail());
        admin.setAddress(new Address());
        return admin;
    }

    public OwnerCompanyDto toClientDto(StockOwnerCompany company, User admin) {
        OwnerCompanyDto dto = new OwnerCompanyDto();
        dto.setName(company.getName());
        Address address = company.getAddress();
        dto.setCountry(address.getCountryName());
        dto.setCity(address.getCityName());
        dto.setStreet(address.getStreet());
        dto.setHome(Integer.toString(address.getHome()));
        dto.setRoom(Integer.toString(address.getRoom()));
        dto.setAdminLogin(admin.getLogin());
        dto.setAdminEmail(admin.getEmail());
        dto.setAdminPassword("");
        dto.setId(company.getId());
        return dto;
    }

    private StockOwnerCompanyBriefDto toStockOwnerCompanyBriefDto(StockOwnerCompany company) {
        StockOwnerCompanyBriefDto dto = new StockOwnerCompanyBriefDto();
        dto.setName(company.getName());
        Address address = company.getAddress();
        dto.setCountry(address.getCountryName());
        dto.setCity(address.getCityName());
        dto.setStreet(address.getStreet());
        dto.setHome(address.getHome());
        dto.setRoom(address.getRoom());
        dto.setActive(company.getActive());
        return dto;
    }

    public StockOwnerPage toStockOwnerPage(Page<StockOwnerCompany> page) {
        StockOwnerPage result = new StockOwnerPage();
        result.setActivePage(page.getNumber() + 1);
        result.setItemsCountPerPage(page.getSize());
        result.setTotalItemsCount(page.getTotalElements());

        List<StockOwnerCompanyBriefDto> clientDtoList = new ArrayList<>();
        page.forEach((stockOwnerCompany) -> clientDtoList.add(toStockOwnerCompanyBriefDto(stockOwnerCompany)));

        result.setClientList(clientDtoList);
        return result;
    }

}

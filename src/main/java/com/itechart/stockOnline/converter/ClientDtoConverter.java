package com.itechart.stockOnline.converter;

import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.dto.ClientDto;
import com.itechart.stockOnline.model.dto.StockOwnerCompanyBriefDto;
import com.itechart.stockOnline.model.dto.StockOwnerPage;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

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
        company.setId(clientDto.getId());
        return company;
    }

    public void updateStockOwnerCompany(StockOwnerCompany companyInBD, StockOwnerCompany newData){
        Address address = companyInBD.getAddress();
        address.setCountryName(newData.getAddress().getCountryName());
        address.setCityName(newData.getAddress().getCityName());
        address.setStreet(newData.getAddress().getStreet());
        address.setHome(newData.getAddress().getHome());
        address.setRoom(newData.getAddress().getRoom());
        User admin = companyInBD.getAdmin();
        admin.setLogin(newData.getAdmin().getLogin());
        admin.setEmail(newData.getAdmin().getEmail());
        admin.setPassword(newData.getAdmin().getPassword());
        companyInBD.setName(newData.getName());
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
        dto.setId(company.getId());
        return dto;
    }

    public StockOwnerCompanyBriefDto toStockOwnerCompanyBriefDto(StockOwnerCompany company) {
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

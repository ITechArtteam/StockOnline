package com.itechart.stockOnline.model.dto.clientcompany;

import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.ClientCompany;
import org.springframework.stereotype.Component;

@Component
public class ClientCompanyBuilder {

    public ClientCompany buildFromDto(ClientCompanyDto dto) {
        ClientCompany clientCompany = new ClientCompany();

        clientCompany.setName(dto.getName());

        Address address = new Address();
        address.setCountryName(dto.getState());
        address.setCityName(dto.getCity());
        address.setStreet(dto.getStreet());
        address.setHome(dto.getHouse());
        address.setRoom(dto.getFlat());
        clientCompany.setAddress(address);

        return clientCompany;
    }
}

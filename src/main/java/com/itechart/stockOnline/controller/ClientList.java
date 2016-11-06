package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.dao.ClientDao;
import com.itechart.stockOnline.model.ClientCompany;
import com.itechart.stockOnline.model.dto.ClientDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/clientList")
public class ClientList {
    private final static Logger Logger = LoggerFactory.getLogger(ClientList.class);

    @Autowired
    private ClientDao clientDao;

    @RequestMapping(value = "/{pageNumber}/{recordCount}", method = RequestMethod.GET)
    public List<ClientDto> getClientList(@PathVariable Integer pageNumber, @PathVariable Integer recordCount) {
        Page<ClientCompany> clientCompanyPage = clientDao.findAll(new PageRequest(pageNumber, recordCount));
        List<ClientDto> clientDtos = new ArrayList<>();
        clientCompanyPage.forEach((clientCompany) -> {
            ClientDto client = new ClientDto();
            client.setCountry(clientCompany.getAddress().getCountryName());
            client.setCity(clientCompany.getAddress().getCityName());
            client.setStreet(clientCompany.getAddress().getStreet());
            client.setAdminLogin(clientCompany.getAdmin().getName());
            client.setName(clientCompany.getName());
            clientDtos.add(client);
        });

        ClientDto d = new ClientDto();
        d.setName("111");
        clientDtos.add(d);
        d = new ClientDto();
        d.setName("222");
        clientDtos.add(d);
        d = new ClientDto();
        d.setName("222");
        clientDtos.add(d);
        return clientDtos;
    }
}

package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.ClientCompanyDao;
import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.ClientCompany;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientCompanyServiceImpl implements ClientCompanyService {

    @Autowired
    private ClientCompanyDao clientCompanyDao;

    @Autowired
    private AddressService addressService;

    @Override
    public ClientCompany getById(Long id) {
        return clientCompanyDao.findById(id);
    }

    @Override
    public List<ClientCompany> getAll() {
        return clientCompanyDao.findAll();
    }

    @Override
    public ClientCompany save(ClientCompany clientCompany) {
        Address address = addressService.save(clientCompany.getAddress());
        clientCompany.setAddress(address);
        return clientCompanyDao.save(clientCompany);
    }

    @Override
    public ClientCompany getByName(String name) {
        return clientCompanyDao.findByName(name);
    }
}

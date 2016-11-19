package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Address;

public interface AddressService {
    Address save(Address address);
    Address findById(Long id);
    Address update(Address address);
}

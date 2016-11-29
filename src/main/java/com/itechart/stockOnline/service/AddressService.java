package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Address;

public interface AddressService {
    Address save(Address address);
    Address update(Address address);

    void delete(Address address);
}

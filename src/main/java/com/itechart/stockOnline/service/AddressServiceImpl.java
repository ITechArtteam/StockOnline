package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.AddressDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.validator.AddressValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class AddressServiceImpl implements AddressService {

    private static final Logger logger = LoggerFactory.getLogger(AddressServiceImpl.class);

    @Autowired
    private AddressDao addressDao;

    @Autowired
    private AddressValidator addressValidator;

    @Override
    @Transactional
    public Address save(Address address) {
        logger.debug("save({})", address);
        validationFields(address);
        return addressDao.save(address);
    }

    @Override
    @Transactional
    public Address update(Address address) {
        validationFields(address);

        Address addressInDB = addressDao.findOne(address.getId());
        if (addressInDB == null){
            throw new DataNotFoundError("Address with id: " + address.getId());
        }

        logger.debug("updateAddress: \n{} -> \n{}", addressInDB, address);
        updateData(address, addressInDB);
        return address;
    }

    private void updateData(Address address, Address addressInDB) {
        addressInDB.setCountryName(address.getCountryName());
        addressInDB.setCityName(address.getCityName());
        addressInDB.setStreet(address.getStreet());
        addressInDB.setHome(address.getHome());
        addressInDB.setRoom(address.getRoom());
        addressInDB.setLatitude(address.getLatitude());
        addressInDB.setLongitude(address.getLongitude());
    }

    private void validationFields(Address address) {
        Map<String, String> errors = addressValidator.check(address);
        if(errors.size() > 0){
            throw new ValidationError(errors);
        }
    }

}

package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressDao extends JpaRepository<Address, Long>{
}

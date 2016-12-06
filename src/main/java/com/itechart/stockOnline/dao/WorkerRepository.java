package com.itechart.stockOnline.dao;

import com.itechart.stockOnline.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkerRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
    Optional<User> findByLogin(String login);
    List<User> findByStockOwnerCompanyId(Long idStockOwnerCompany);

}

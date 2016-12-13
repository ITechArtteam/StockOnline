package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.RoleDao;
import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.validator.UserValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserDao userDao;

    private final UserValidator userValidator;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final RoleDao roleDao;

    private final AddressService addressService;

    @Autowired
    public UserServiceImpl(UserDao userDao, BCryptPasswordEncoder bCryptPasswordEncoder, UserValidator userValidator, RoleDao roleDao, AddressService addressService) {
        this.userDao = userDao;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userValidator = userValidator;
        this.roleDao = roleDao;
        this.addressService = addressService;
    }

    @Override
    @Transactional
    public User save(User user) {
        logger.debug("save({})", user);
        validationFields(user);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        setRolesFromDB(user);
        return userDao.save(user);
    }

    @Override
    @Transactional
    public User update(User user) {
        validationFields(user);
        if (user.getRoles() != null) {
            setRolesFromDB(user);
        }
        User userInDB = userDao.findOne(user.getId());
        if (userInDB == null){
            throw new DataNotFoundError("User with id: " + user.getId());
        }
        logger.debug("updateUser: \n{} -> \n{}", userInDB, user);

        updateData(user, userInDB);
        return userInDB;
    }

    private void updateData(User user, User userInDB) {
        setDependency(user, userInDB);

        userInDB.setName(user.getName());
        userInDB.setSurname(user.getSurname());
        userInDB.setPatronymic(user.getPatronymic());
        userInDB.setEmail(user.getEmail());
        userInDB.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userInDB.setLogin(user.getLogin());
        userInDB.setBirthday(user.getBirthday());
    }

    private void setDependency(User user, User userInDB) {
        Address address = user.getAddress();
        address.setId(userInDB.getAddress().getId());
        addressService.update(address);
        userInDB.setStockOwnerCompany(user.getStockOwnerCompany());
        if (user.getRoles() != null) {
            userInDB.setRoles(user.getRoles());
        }
    }


    private void validationFields(User user) {
        Map<String, String> errors = userValidator.check(user);
        if (errors.size() > 0){
            throw new ValidationError(errors);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public User findByLogin(String login) {
        User user = userDao.findByLogin(login).orElseThrow(DataNotFoundError::new);
        logger.debug("findByLogin({}): {}", login, user);
        return user;
    }

    @Override
    public void delete(User user) {
        Address address = user.getAddress();
        userDao.delete(user);
        addressService.delete(address);
    }

    @Override
    @Transactional(readOnly = true)
    public User findByCompany(StockOwnerCompany company) {
        User user = userDao.findByStockOwnerCompany(company);
        if (user == null){
            throw new DataNotFoundError(String.format("User not found for company %s", company));
        }
        logger.debug("findByStockOwnerCompany({}): {}", company, user);
        return user;
    }

    @Override
    @Transactional(readOnly = true)
    public Set<User> findAllByStockOwnerCompany(StockOwnerCompany stockOwnerCompany) {
        Set<User> users = userDao.findAllByStockOwnerCompany(stockOwnerCompany);
        if (users == null){
            throw new DataNotFoundError(String.format("User not found for company %s", stockOwnerCompany));
        }
        logger.debug("findByStockOwnerCompany({}): {}", stockOwnerCompany, users);
        return users;
    }

    public void setRolesFromDB(User user) {
        Set<Role> rolesFromDB = new HashSet<>();
        for(Role role: user.getRoles()) {
            rolesFromDB.add(roleDao.findByName(role.getName()).orElseThrow(DataNotFoundError::new));
        }
        user.setRoles(rolesFromDB);
    }

}

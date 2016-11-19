package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.RoleDao;
import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Role;
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

    private final RoleDao roleDao;

    private final UserValidator userValidator;

    private final AddressService addressService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserDao userDao, RoleDao roleDao, AddressService addressService, BCryptPasswordEncoder bCryptPasswordEncoder, UserValidator userValidator) {
        this.userDao = userDao;
        this.roleDao = roleDao;
        this.addressService = addressService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userValidator = userValidator;
    }

    @Override
    @Transactional
    public User save(User user) {
        logger.debug("save({})", user);
        validationFields(user);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setAddress(addressService.save(user.getAddress()));
        setRolesFromDB(user);
        return userDao.save(user);
    }

    @Override
    @Transactional
    public User update(User user) {
        validationFields(user);

        User userInDB = userDao.findOne(user.getId());
        if (userInDB == null){
            throw new DataNotFoundError("User with id: " + user.getId());
        }
        logger.debug("updateUser: {} -> {}", userInDB, user);

        updateData(user, userInDB);

        return userInDB;
    }

    private void updateData(User user, User userInDB) {
        userInDB.setAddress(addressService.update(user.getAddress()));
        userInDB.setName(user.getName());
        userInDB.setSurname(user.getSurname());
        userInDB.setPatronymic(user.getPatronymic());
        userInDB.setEmail(user.getEmail());
        userInDB.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userInDB.setLogin(user.getLogin());
        userInDB.setBirthday(user.getBirthday());
        setRolesFromDB(user);
        userInDB.setRoles(user.getRoles());
    }

    private void setRolesFromDB(User user) {
        Set<Role> roles = new HashSet<>();
        for(Role role: user.getRoles()) {
            Role roleInDB = roleDao.findByName(role.getName()).orElseThrow(DataNotFoundError::new);
            roles.add(roleInDB);
        }
        user.setRoles(roles);
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
}

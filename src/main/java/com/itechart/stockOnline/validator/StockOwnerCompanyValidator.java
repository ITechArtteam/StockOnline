package com.itechart.stockOnline.validator;

import com.itechart.stockOnline.dao.StockOwnerCompanyDao;
import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.exception.NotValidError;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.dto.OwnerCompanyDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.regex.Pattern;

@Component
public class StockOwnerCompanyValidator {

    @Autowired
    private StockOwnerCompanyDao stockOwnerCompanyDao;

    @Autowired
    private UserDao userDao;

    public void checkNewOwnerCompany(StockOwnerCompany ownerCompany){
        OwnerCompanyDto errorDto = new OwnerCompanyDto();

        checkCompanyName(ownerCompany, errorDto);
        checkAdminEmail(ownerCompany, errorDto);
        checkAdminLogin(ownerCompany, errorDto);
        checkAdminPassword(ownerCompany, errorDto);

        checkErrors(errorDto);
    }

    private void checkAdminPassword(StockOwnerCompany ownerCompany, OwnerCompanyDto errorDto) {
        String password = ownerCompany.getAdmin().getPassword();
        if (StringUtils.isEmpty(password)){
            errorDto.setAdminLogin("Введите пароль администратора.");
        } else if (password.length() < 3){
            errorDto.setAdminLogin("Слишком короткий пароль администратора.");
        }
    }

    private void checkAdminLogin(StockOwnerCompany ownerCompany, OwnerCompanyDto errorDto) {
        String login = ownerCompany.getAdmin().getLogin();
        if (StringUtils.isEmpty(login)){
            errorDto.setAdminLogin("Введите логин администратора.");
        } else if (login.length() < 3){
            errorDto.setAdminLogin("Слишком короткий логин администратора.");
        } else if (!checkRegexp("^[a-z_а-я]*$", login)){
            errorDto.setAdminLogin("Может содержать только буквы и символ подчеркивания.");
        }
        Optional<User> adminInDB = userDao.findByLogin(login);
        Optional<StockOwnerCompany> ownerCompanyInBD = stockOwnerCompanyDao.findById(ownerCompany.getId());
        if (adminInDB.isPresent() &&
                (!ownerCompanyInBD.isPresent() || !ownerCompanyInBD.get().getAdmin().getLogin().equals(login))){
            errorDto.setAdminLogin("Логин уже занят.");
        }
    }

    private void checkAdminEmail(StockOwnerCompany ownerCompany, OwnerCompanyDto errorDto) {
        String email= ownerCompany.getAdmin().getEmail();
        if (StringUtils.isEmpty(email)){
            errorDto.setName("Введите email.");
        }  else if (!checkRegexp("^[a-z_]+[0-9a-z_\u002E\u005F]*[a-z0-9_]+@([a-z]){2,10}\u002E[a-z]{2,4}$", email)){
            errorDto.setAdminEmail("Несуществующий email. Верный формат: \"x@xx.xx\"");
        }
        Optional<User> adminInDB = userDao.findByEmail(email);
        Optional<StockOwnerCompany> ownerCompanyInBD = stockOwnerCompanyDao.findById(ownerCompany.getId());
        if (adminInDB.isPresent() &&
                (!ownerCompanyInBD.isPresent() || !ownerCompanyInBD.get().getAdmin().getEmail().equals(email))){
            errorDto.setAdminEmail("Email уже занят.");
        }
    }

    private void checkCompanyName(StockOwnerCompany ownerCompany, OwnerCompanyDto errorDto) {
        String name = ownerCompany.getName();
        if (StringUtils.isEmpty(name)){
            errorDto.setName("Введите название компании.");
        } else if (name.length() < 3){
            errorDto.setName("Слишком короткое название компании.");
        } else if (!checkRegexp("^[a-z_а-я]*$", name)){
            errorDto.setName("Может содержать только буквы и символ подчеркивания.");
        }
        Optional<StockOwnerCompany> ownerCompanyInBD = stockOwnerCompanyDao.findByName(ownerCompany.getName());
        if (ownerCompanyInBD.isPresent() && !ownerCompany.getId().equals(ownerCompanyInBD.get().getId()) ){
            errorDto.setName("Имя компании уже занято.");
        }
    }

    private void checkErrors(OwnerCompanyDto errorDto) {
        if (StringUtils.isNotEmpty(errorDto.getName()) ||
                StringUtils.isNotEmpty(errorDto.getRoom()) ||
                StringUtils.isNotEmpty(errorDto.getAdminEmail()) ||
                StringUtils.isNotEmpty(errorDto.getAdminLogin()) ||
                StringUtils.isNotEmpty(errorDto.getAdminPassword()) ||
                StringUtils.isNotEmpty(errorDto.getCity()) ||
                StringUtils.isNotEmpty(errorDto.getCountry()) ||
                StringUtils.isNotEmpty(errorDto.getHome()) ||
                StringUtils.isNotEmpty(errorDto.getStreet()) ||
                StringUtils.isNotEmpty(errorDto.getRoom())){
            throw new NotValidError(errorDto);
        }
    }

    private boolean checkRegexp(String regexp, String str){
        return Pattern.compile(regexp, Pattern.UNICODE_CASE | Pattern.CASE_INSENSITIVE).matcher(str).matches();
    }
}

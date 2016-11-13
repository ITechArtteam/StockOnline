package com.itechart.stockOnline.validator;

import com.itechart.stockOnline.dao.AddressDao;
import com.itechart.stockOnline.dao.StockOwnerCompanyDao;
import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.exception.NotValidError;
import com.itechart.stockOnline.model.StockOwnerCompany;
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

    @Autowired
    private AddressDao addressDao;

    public void checkNewOwnerCompany(StockOwnerCompany ownerCompany){
        OwnerCompanyDto errorDto = new OwnerCompanyDto();
        checkCompanyName(ownerCompany, errorDto);

        checkErrors(errorDto);
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
        if (ownerCompanyInBD.isPresent() && ownerCompany.getId() != ownerCompanyInBD.get().getId()){
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

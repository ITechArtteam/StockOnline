package com.itechart.stockOnline.validator;

import com.itechart.stockOnline.dao.StockOwnerCompanyDao;
import com.itechart.stockOnline.model.StockOwnerCompany;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class StockOwnerCompanyValidator {

    private final StockOwnerCompanyDao stockOwnerCompanyDao;

    @Autowired
    public StockOwnerCompanyValidator(StockOwnerCompanyDao stockOwnerCompanyDao) {
        this.stockOwnerCompanyDao = stockOwnerCompanyDao;
    }

    public Map<String, String> checkNewOwnerCompany(StockOwnerCompany ownerCompany){
        Map<String, String> errors = new HashMap<>();
        checkCompanyName(ownerCompany, errors);
        return errors;
    }

    private void checkCompanyName(StockOwnerCompany ownerCompany, Map<String, String> errors) {
        String name = ownerCompany.getName();
        if (StringUtils.isEmpty(name)){
            errors.put("companyName", "Введите название компании.");
        } else if (name.length() < 3){
            errors.put("companyName", "Слишком короткое название компании.");
        } else if (!ValidatorUtils.checkRegexp("^[a-z_а-я]*$", name)){
            errors.put("companyName", "Может содержать только буквы и символ подчеркивания.");
        }
        Optional<StockOwnerCompany> ownerCompanyInBD = stockOwnerCompanyDao.findByName(ownerCompany.getName());
        if (ownerCompanyInBD.isPresent() && !ownerCompanyInBD.get().getId().equals(ownerCompany.getId())){
            errors.put("companyName", "Имя компании уже занято.");
        }
    }


}

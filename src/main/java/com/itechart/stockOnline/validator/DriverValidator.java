package com.itechart.stockOnline.validator;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class DriverValidator {

    public Map<String, String> checkPassportNumber(String passportNumber){
        Map<String, String> errors = new HashMap<>();
        if (!ValidatorUtils.checkRegexp("^[a-z]{2,4}[0-9]{3,10}$", passportNumber)){
            errors.put("searchNumber", "Только английские буквы и цифры. Формат:  буквы{2-4}цифры{3-10}");
        }
        return errors;
    }

}

package com.itechart.stockOnline.validator;

import com.itechart.stockOnline.model.Address;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class AddressValidator {
    private Address address;

    public Map<String, String> check(Address address){
        this.address = address;
        Map<String, String> errors = new HashMap<>();
        checkHome(errors);
        checkRoom(errors);
        return errors;
    }

    private void checkHome(Map<String, String> errors) {
        Integer home = address.getHome();
        if (home < 0){
            errors.put("home", "Номер дома должен быть больше 0.");
            return;
        }
        if (home > 9999999){
            errors.put("home", "Номер дома должен быть меньше 8 цифр.");
            return;
        }
    }

    private void checkRoom(Map<String, String> errors) {
        Integer room = address.getRoom();
        if (room < 0){
            errors.put("room", "Номер квартиры должен быть больше 0.");
            return;
        }
        if (room > 9999999){
            errors.put("room", "Номер квартиры должен быть меньше 8 цифр.");
            return;
        }
    }

}

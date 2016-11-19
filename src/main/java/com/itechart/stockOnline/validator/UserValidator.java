package com.itechart.stockOnline.validator;

import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.model.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@Component
public class UserValidator {

    @Autowired
    private UserDao userDao;

    private User user;

    public Map<String, String> check(User user){
        this.user = user;
        Map<String, String> errors = new HashMap<>();

        checkEmail(errors);
        checkLogin(errors);
        checkPassword(errors);
        return errors;
    }

    private void checkPassword(Map<String, String> errors) {
        String password = user.getPassword();
        if (StringUtils.isEmpty(password)){
            errors.put("password","Пароль не должен быть пустым.");
            return;
        }
        if (password.length() < 3){
            errors.put("password","Пароль должен содержать минимум 3 символа.");
            return;
        }
    }

    private void checkLogin(Map<String, String> errors) {
        String login = user.getLogin();
        if (StringUtils.isEmpty(login)){
            errors.put("login","Логин не должен быть пустым.");
            return;
        }
        if (login.length() < 3){
            errors.put("login","Логин должен содержать минимум 3 символа.");
            return;
        }
        if (!checkRegexp("^[a-z_а-я]*$", login)){
            errors.put("login","Логин должен содержать только буквы и/или символы подчеркивания.");
            return;
        }
        Optional<User> userInBD = userDao.findByLogin(login);
        if (userInBD.isPresent() && !userInBD.get().getId().equals(user.getId())){
            errors.put("login","Логин уже занят.");
            return;
        }
    }

    private void checkEmail(Map<String, String> errors) {
        String email= user.getEmail();
        if (StringUtils.isEmpty(email)){
            errors.put("email", "Email не должен быть пустым.");
            return;
        }
        if (!checkRegexp("^[a-z_]+[0-9a-z_\u002E\u005F]*[a-z0-9_]+@([a-z]){2,10}\u002E[a-z]{2,4}$", email)){
            errors.put("email","Некорректный формат email. Верный формат: \"x@xx.xx\"");
            return;
        }
        Optional<User> userInDB = userDao.findByEmail(email);
        if (userInDB.isPresent() && !userInDB.get().getId().equals(user.getId())){
            errors.put("email","Email уже занят.");
            return;
        }
    }


    private boolean checkRegexp(String regexp, String str){
        return Pattern.compile(regexp, Pattern.UNICODE_CASE | Pattern.CASE_INSENSITIVE).matcher(str).matches();
    }
}

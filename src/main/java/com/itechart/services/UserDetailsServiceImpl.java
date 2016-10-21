package com.itechart.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static java.util.Arrays.asList;

@Service
@Configurable
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws
            UsernameNotFoundException {
        //лезем в базу и ищем пользователя, если нашли возвращаем его, иначе
        return new User("dima", passwordEncoder.encode("password1"), asList(() -> "ROLE_ADMIN"));
    }
}

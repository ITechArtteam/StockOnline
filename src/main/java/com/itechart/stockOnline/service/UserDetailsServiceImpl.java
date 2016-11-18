package com.itechart.stockOnline.service;

import com.itechart.stockOnline.dao.UserDao;
import com.itechart.stockOnline.exception.DataNotFoundError;
import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByLogin(username).orElseThrow(DataNotFoundError::new);

        if (user != null) {
            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();

            for (Role role : user.getRoles()) {
                grantedAuthorities.add(new SimpleGrantedAuthority(
                        role.getName()));
            }

            return new org.springframework.security.core.userdetails.User(
                    user.getName(), user.getPassword(), grantedAuthorities);
        } else {
            throw new UsernameNotFoundException(
                    String.format("Cannot find user with name=`%s`", username));
        }
    }
}

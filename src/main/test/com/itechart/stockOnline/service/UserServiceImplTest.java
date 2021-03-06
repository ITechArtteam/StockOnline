package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:appconfig-root.xml")
public class UserServiceImplTest {

    @Autowired
    private UserService userService;

    private User getDefaultUser(){

        User user = new User();
        user.setPassword("111");
        user.setLogin("TestLogin");
        user.setEmail("test1@email.com");
        Set<Role> role = new HashSet<>();
        role.add(new Role("ADMIN"));
        user.setRoles(role);
        user.setAddress(new Address());

        return user;
    }

    @Test
    public void delete() {
        User user = getDefaultUser();
        userService.save(user);
        userService.delete(userService.findByLogin("TestLogin"));
    }

    @Test
    public void save() {
        User user = getDefaultUser();
        userService.save(user);
        User userInDB = userService.findByLogin("TestLogin");
        assertNotNull(userInDB.getAddress());
        assertNotNull(userInDB.getRoles());
        assertEquals(user.getRoles().iterator().next().getName(), userInDB.getRoles().iterator().next().getName());
        assertEquals(user.getName(), userInDB.getName());
        assertEquals(user.getLogin(), userInDB.getLogin());
        assertEquals(user.getEmail(), userInDB.getEmail());
    }

    @Test
    public void update() {
        User oldUser = getDefaultUser();
        userService.save(oldUser);

        User user = getDefaultUser();
        user.setId(oldUser.getId());
        user.setEmail("new@test.emal");
        user.setName("updatedUser");

        user.getAddress().setCountryName("userBel");
        user.getRoles().add(new Role("SECOND"));
        userService.update(user);

        User userInDB = userService.findByLogin("TestLogin");
        assertNotNull(userInDB.getAddress());
        assertNotNull(userInDB.getRoles());
        assertEquals(2, userInDB.getRoles().size());
        assertEquals(user.getAddress().getCountryName(), userInDB.getAddress().getCountryName());
        assertEquals(user.getName(), userInDB.getName());
        assertEquals(user.getLogin(), userInDB.getLogin());
        assertEquals(user.getEmail(), userInDB.getEmail());
    }

}
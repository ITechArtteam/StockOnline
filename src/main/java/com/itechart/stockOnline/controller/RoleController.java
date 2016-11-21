package com.itechart.stockOnline.controller;


import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping(value="/api" )
public class RoleController {
    private final static Logger LOGGER = LoggerFactory.getLogger(RoleController.class);
    @Autowired
    private RoleService roleService;
    @RequestMapping(value="/roles", method = RequestMethod.GET )
    public List<Role> geRoles(){
        LOGGER.debug("REST request. Path:/roles  method: GET");
        return roleService.getAll();
    }
}

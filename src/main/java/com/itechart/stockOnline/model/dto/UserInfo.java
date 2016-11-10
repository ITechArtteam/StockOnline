package com.itechart.stockOnline.model.dto;

import java.util.Set;

public class UserInfo {

    private String username;
    private Set<String> roles;

    public UserInfo(String username, Set<String> roles) {
        this.username = username;
        this.roles = roles;
    }

    public UserInfo() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}

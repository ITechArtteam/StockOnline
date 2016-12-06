package com.itechart.stockOnline.model.dto;

import com.itechart.stockOnline.model.StockOwnerCompany;

import java.util.Set;

public class UserInfo {
    private Long id;
    private String username;
    private Set<String> roles;
    private Long idCompany;

    public UserInfo(Long id, String username, Set<String> roles, Long idCompany) {
        this.username = username;
        this.roles = roles;
        this.id=id;
        this.idCompany=idCompany;
    }

    public Long getIdCompany() {
        return idCompany;
    }

    public void setIdCompany(Long idStockOwnerCompany) {
        this.idCompany = idCompany;
    }

    public UserInfo() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

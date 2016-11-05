package com.itechart.stockOnline.service;

public interface SecurityService {

    String findLoggedInName();

    void autoLogin(String name, String password);
}

package com.itechart.stockOnline.service;


import com.itechart.stockOnline.dao.ActRepository;
import com.itechart.stockOnline.dao.CompanyRepository;
import com.itechart.stockOnline.dao.WorkerRepository;
import com.itechart.stockOnline.model.Act;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActServiceImpl implements ActService{
    @Autowired
    private ActRepository actRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Override
    public void delete(Long[] ids) {
        Arrays.stream(ids).forEach(id -> {
            actRepository.delete(id);
        });
    }

    @Override
    public void delete(Long id) {
        actRepository.delete(id);
    }

    @Override
    public List<Act> getAll() {
        return actRepository.findAll();
    }

    @Override
    public Act get(Long id) {
        return actRepository.findOne(id);
    }

    @Override
    public Act save(Act act) {
        return actRepository.save(act);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Act> getByCompany(Long id) {
        StockOwnerCompany one = companyRepository.getOne(id);
        return actRepository.findByUserIdIn(one.getUsers().stream().map(User::getId).collect(Collectors.toList()));
    }
}

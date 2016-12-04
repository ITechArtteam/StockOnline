package com.itechart.stockOnline.service;


import com.itechart.stockOnline.dao.ActRepository;
import com.itechart.stockOnline.model.Act;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
@Service
public class ActServiceImpl implements ActService{
    @Autowired
    private ActRepository actRepository;
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
}

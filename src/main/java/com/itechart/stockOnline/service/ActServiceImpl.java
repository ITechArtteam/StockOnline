package com.itechart.stockOnline.service;


import com.itechart.stockOnline.dao.ActRepository;
import com.itechart.stockOnline.dao.CompanyRepository;
import com.itechart.stockOnline.dao.WorkerRepository;
import com.itechart.stockOnline.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ActServiceImpl implements ActService{

    private final static Logger logger = LoggerFactory.getLogger(WaybillServiceImpl.class);

    @Autowired
    private ActRepository actRepository;
    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private ProductService productService;

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
    @Transactional(readOnly = true)
    public Act get(Long id) {
        Act act = actRepository.findOne(id);
        act.getProductInActs();
        return act;
    }




    @Override
    public Act save(Act act) {
        return actRepository.save(act);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Act> getByCompany(Long id) {
        StockOwnerCompany one = companyRepository.getOne(id);
        List<Act> acts = actRepository.findByUserIdIn(one.getUsers().stream().map(User::getId).collect(Collectors.toList()));
        acts.stream().forEach(act->{act.getWaybill();});
        return acts;
    }

    @Override
    @Transactional
    public void updateProductCount(Act act) {
        logger.info("updateProductCount({})", act);
        List<Product> productList = act.getProductInActs().stream().map(productInAct -> {
            int productInActCount = productInAct.getCount();
            Product product = productInAct.getProduct();
            product.setCount(product.getCount() - productInActCount);
            return product;
        }).collect(Collectors.toList());
        productService.update(productList);
    }
}

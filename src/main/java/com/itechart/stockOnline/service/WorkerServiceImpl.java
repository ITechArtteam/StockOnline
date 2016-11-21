package com.itechart.stockOnline.service;


import com.itechart.stockOnline.dao.RoleRepository;
import com.itechart.stockOnline.dao.WorkerRepository;
import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service
public class WorkerServiceImpl implements WorkerService {
    @Autowired
    private WorkerRepository workerRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<User> getAll() {
        List<User> workers = workerRepository.findAll();
        return workerRepository.findAll();
    }

    @Override
    public User get(Long id) {
        User worker = workerRepository.getOne(id);
        return  worker;
    }

    @Override
    @Transactional
    public User save(User user) {
        return workerRepository.save(user);
    }

    @Override
    public void delete(Long id) {
        workerRepository.delete(id);

    }

    @Override
    public void delete(User... workers) {
        Arrays.stream(workers).forEach(worker -> {
            workerRepository.delete(worker);
        });
    }
}

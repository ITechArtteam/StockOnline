package com.itechart.stockOnline.service;


import com.itechart.stockOnline.dao.RoleRepository;
import com.itechart.stockOnline.dao.WorkerRepository;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.validation.EmailBusyException;
import com.itechart.stockOnline.validation.LoginBusyException;
import com.itechart.stockOnline.validation.Validator;
import com.itechart.stockOnline.validation.BindingResult;
import com.itechart.stockOnline.validator.Worker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class WorkerServiceImpl implements WorkerService {
    @Autowired
    private WorkerRepository workerRepository;
    @Autowired
    private RoleRepository roleRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public WorkerServiceImpl(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAll() {
        return workerRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public User get(Long id) {
        User worker = workerRepository.findOne(id);
        return  worker;
    }

    @Override
    public User save(User worker) {
        BindingResult bindingResult = Validator.getValidator().check(worker, Worker.class);
        if (bindingResult.hasErroe()){
            throw new ValidationError(bindingResult.get());
        }

        if (workerRepository.findByEmail(worker.getEmail()).isPresent()){
            bindingResult.addError("email",new EmailBusyException("email занят"));
        }
        if (workerRepository.findByLogin(worker.getLogin()).isPresent()){
            bindingResult.addError("login",new LoginBusyException("login занят"));
        }
        if (bindingResult.hasErroe()){
            throw new ValidationError(bindingResult.get());
        }
        worker.setPassword(bCryptPasswordEncoder.encode(worker.getPassword()));
        return workerRepository.save(worker);
    }

    @Override
    public void delete(Long id) {
        workerRepository.delete(id);

    }

    @Override
    public void delete(Long... ids) {
        Arrays.stream(ids).forEach(id -> {
            workerRepository.delete(id);
        });
    }

    @Override
    public void delete(User... workers) {
        Arrays.stream(workers).forEach(worker -> {
            workerRepository.delete(worker);
        });
    }
}

package com.itechart.stockOnline.service;


import com.itechart.stockOnline.dao.WorkerRepository;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.validation.BindingResult;
import com.itechart.stockOnline.validation.EmailBusyException;
import com.itechart.stockOnline.validation.LoginBusyException;
import com.itechart.stockOnline.validation.Validator;
import com.itechart.stockOnline.validator.Worker;
import org.apache.commons.lang.StringUtils;
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
    public List<User> getByCompany(Long idCompany) {
        List<User> workers = workerRepository.findByStockOwnerCompanyId(idCompany);
        return workers;
    }

    @Override
    @Transactional(readOnly = true)
    public User get(Long id) {
        User worker = workerRepository.findOne(id);
        worker.setPassword(null);
        return worker;
    }

    @Override
    public User save(User worker) {
        BindingResult bindingResult = Validator.getValidator().check(worker, Worker.class);
        if (bindingResult.hasErroe()) {
            throw new ValidationError(bindingResult.get());
        }
        if (worker.getId() != null) {
            User one = workerRepository.findOne(worker.getId());
            if (!one.getEmail().equals(worker.getEmail())) {
                workerRepository.findByEmail(worker.getEmail()).ifPresent((email) -> {
                    bindingResult.addError("email", new EmailBusyException("Такая электронная почта занята."));
                });
            }
            if (!one.getLogin().equals(worker.getLogin())) {
                workerRepository.findByLogin(worker.getLogin()).ifPresent((login) -> {
                    bindingResult.addError("login", new LoginBusyException("Такой логин занят."));
                });
            }
            if (StringUtils.isEmpty(worker.getPassword())){
                worker.setPassword(one.getPassword());
            } else{
                worker.setPassword(bCryptPasswordEncoder.encode(worker.getPassword()));
            }
        } else {
            workerRepository.findByEmail(worker.getEmail()).ifPresent((email) -> {
                bindingResult.addError("email", new EmailBusyException("Такая электронная почта занята."));
            });
            workerRepository.findByLogin(worker.getLogin()).ifPresent((login) -> {
                bindingResult.addError("login", new LoginBusyException("Такой логин занят."));
            });
            if (StringUtils.isEmpty(worker.getPassword())){
                bindingResult.addError("login", new Exception("Пароль не введен."));
            }
            worker.setPassword(bCryptPasswordEncoder.encode(worker.getPassword()));
        }
        if (bindingResult.hasErroe()) {
            throw new ValidationError(bindingResult.get());
        }
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

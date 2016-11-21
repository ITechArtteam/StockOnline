package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.User;
import org.springframework.stereotype.Service;

import javax.jws.soap.SOAPBinding;
import java.util.*;

@Service
public class WorkerStubServiceImpl implements WorkerService{
    private static long key=0;
    private Map<Long, User> userMap;
    public WorkerStubServiceImpl(){
        userMap = new HashMap<>();
        User firstWorker = new User();
        firstWorker.setId(getKey());
        firstWorker.setName("Alex");
        firstWorker.setSurname("Natashkin");
        firstWorker.setEmail("natashkinsasah@gmail.com");
        User secondWorker = new User();
        secondWorker.setId(getKey());
        secondWorker.setName("Pasha");
        secondWorker.setSurname("Rydak");
        Address secondAddress = new Address();
        secondAddress.setCityName("Belarus");
        secondAddress.setStreet("Kossovskii tract");
        secondWorker.setAddress(secondAddress);
        userMap.put(firstWorker.getId(), firstWorker);
        userMap.put(secondWorker.getId(), secondWorker);
    }
    private long getKey(){
        return ++key;
    }
    @Override
    public List<User> getAll() {
        return new ArrayList<User>(userMap.values());
    }

    @Override
    public User get(Long id) {
        return userMap.get(id);
    }

    @Override
    public User save(User user) {
        if (user.getId()==null){
            long key = getKey();
            user.setId(key);
            userMap.put(key, user);
        } else {
            userMap.put(user.getId(), user);
        }
        return user;
    }

    @Override
    public void delete(Long id) {
        userMap.remove(id);
    }

    @Override
    public void delete(User[] workers) {
        Arrays.stream(workers).forEach((worker)->userMap.remove(worker.getId()));
    }
}
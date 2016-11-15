package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.User;
import org.springframework.stereotype.Service;

import javax.jws.soap.SOAPBinding;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class WorkerStubServiceImpl implements WorkerService{
    private static int key=0;
    private Map<Integer, User> userMap;
    public WorkerStubServiceImpl(){
        userMap = new HashMap<>();
        User firstWorker = new User();
        firstWorker.setId(getKey());
        User secondWorker = new User();
        secondWorker.setId(getKey());
        userMap.put(firstWorker.getId(), firstWorker);
        userMap.put(secondWorker.getId(), firstWorker);
    }
    private int getKey(){
        return key++;
    }
    @Override
    public List<User> getAll() {
        return new ArrayList<User>(userMap.values());
    }

    @Override
    public User get(int id) {
        return userMap.get(id);
    }

    @Override
    public User save(User user) {
        if (user.getId()==null){
            int key = getKey();
            user.setId(key);
            userMap.put(key, user);
        } else {
            userMap.put(user.getId(), user);
        }
        return null;
    }

    @Override
    public void delete(int id) {
        userMap.remove(id);
    }
}

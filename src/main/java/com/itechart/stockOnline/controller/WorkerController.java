package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
public class WorkerController {
    @Autowired
    private WorkerService workerService;
    @RequestMapping(value="/api/workers", method = RequestMethod.GET )
    public List<User> getWorkers(){
        return workerService.getAll();
    }

    @RequestMapping(value="/api/worker/{id}", method = RequestMethod.GET )
    public User getWorker(@PathVariable Integer id){
        return workerService.get(id);
    }

    @RequestMapping(value="/api/worker/{id}", method = RequestMethod.DELETE )
    public void deleteWorker(@PathVariable Integer id){
        workerService.delete(id);
    }

    @RequestMapping(value="/api/worker", method = RequestMethod.POST)
    public User saveWorker(@RequestBody User user){
        return workerService.save(user);
    }
}

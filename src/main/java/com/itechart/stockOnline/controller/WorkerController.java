package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/api" )
public class WorkerController {
    @Autowired
    private WorkerService workerService;
    @RequestMapping(value="/workers", method = RequestMethod.GET )
    public List<User> getWorkers(){
        return workerService.getAll();
    }

    @RequestMapping(value="/worker/{id}", method = RequestMethod.GET )
    public User getWorker(@PathVariable Integer id){
        return workerService.get(id);
    }

    @RequestMapping(value="/worker/{id}", method = RequestMethod.DELETE )
    public void deleteWorker(@PathVariable Integer id){
        workerService.delete(id);
    }

    @RequestMapping(value="/worker", method = RequestMethod.POST)
    public User saveWorker(@RequestBody User user){
        return workerService.save(user);
    }
}

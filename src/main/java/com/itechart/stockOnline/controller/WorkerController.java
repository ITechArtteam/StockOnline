package com.itechart.stockOnline.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.service.WorkerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@JsonInclude(JsonInclude.Include.NON_NULL)
@RequestMapping(value = "/api")
public class WorkerController {
    private final static Logger LOGGER = LoggerFactory.getLogger(WorkerController.class);
    @Autowired
    @Qualifier("workerServiceImpl")
    private WorkerService workerService;

    @RequestMapping(value = "/workers", method = RequestMethod.GET)
    public List<User> getWorkers() {
        LOGGER.debug("REST request. Path:/workers  method: GET");
        return workerService.getAll();
    }

    @RequestMapping(value = "/worker/{id}", method = RequestMethod.GET)
    public User getWorker(@PathVariable Long id) {
        LOGGER.debug("REST request. Path:/worker/{id}  method: GET", id);
        return workerService.get(id);
    }

    @RequestMapping(value = "/worker/{id}", method = RequestMethod.DELETE)
    public void deleteWorker(@PathVariable Long id) {
        LOGGER.debug("REST request. Path:/worker/{id}  method: DELETE", id);
        workerService.delete(id);
    }

    @RequestMapping(value = "/workers", method = RequestMethod.DELETE)
    public void deleteWorkers(@RequestBody User[] workers) {
        LOGGER.debug("REST request. Path:/workers  method: DELETE Request body {workers}", workers);
        workerService.delete(workers);
    }

    @RequestMapping(value = "/worker", method = RequestMethod.POST)
    public User saveWorker(@RequestBody User worker) {
        LOGGER.debug("REST request. Path:/worker  method: POST Request body {worker}", worker);
        return workerService.save(worker);

    }

    @ExceptionHandler(ValidationError.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String fieldHasErrors(ValidationError error){
        LOGGER.error("fieldHasErrors({})", error.toString());
        return error.getErrors().toString();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String exception(Exception exception){
        LOGGER.error("fieldHasErrors({})", exception.getMessage());
        return "Ошибка на сервере";
    }


}

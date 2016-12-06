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

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

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


    @RequestMapping(value = "/workers_by_company", method = RequestMethod.GET)
    public List<User> getWorkersByCompany(@RequestParam(value = "idCompany") Long idCompany) {
        LOGGER.debug("REST request. Path:/workers?idCompany=  method: GET", idCompany);
        return workerService.getByCompany(idCompany);
    }


    //это затычка
    @RequestMapping(value = "/controllers", method = RequestMethod.GET)
    public List<User> getControllers() {
        LOGGER.debug("REST request. Path:/workers  method: GET");
        return workerService.getAll();
    }

    @RequestMapping(value = "/worker/{id}", method = RequestMethod.GET)
    public User getWorker(@PathVariable Long id) {
        LOGGER.debug("REST request. Path:/worker/{id}  method: GET", id);
        return workerService.get(id);
    }

    @RequestMapping(value = "/worker/{id}", method = RequestMethod.DELETE)
    public void deleteWorker(@PathVariable Long id, HttpServletResponse response) {
        LOGGER.debug("REST request. Path:/worker/{id}  method: DELETE", id);
        workerService.delete(id);
        response.addHeader("result", "Worker have deleted.");
    }


    @RequestMapping(value = "/workers", method = RequestMethod.DELETE)
    public void deleteWorkers(@RequestParam(value = "ids") List<Long> workersId, HttpServletResponse response ) {
        LOGGER.debug("REST request. Path:/workers?ids={}  method: DELETE Request body {workers}", workersId);
        workerService.delete(workersId.toArray(new Long[workersId.size()]));
        response.addHeader("result", "Worker has deleted.");
    }

    @RequestMapping(value = "/worker", method = RequestMethod.POST)
    public void saveWorker(@RequestBody User worker, HttpServletResponse response) {
        LOGGER.debug("REST request. Path:/worker  method: POST Request body {worker}", worker);
        User saveWorker = workerService.save(worker);
        response.addHeader("result", "Worker has saved.");
    }

    @ExceptionHandler(ValidationError.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> fieldHasErrors(ValidationError error, HttpServletResponse response){
        LOGGER.error("fieldHasErrors({})", error.toString());
        response.addHeader("result", "Fields is not valid.");
        return error.getErrors();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void exception(Exception exception, HttpServletResponse response){
        LOGGER.error("fieldHasErrors({})", exception.getMessage());
        response.addHeader("result", "Server error.");
    }


}

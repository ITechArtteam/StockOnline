package com.itechart.stockOnline.controller;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Act;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.service.ActService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@JsonInclude(JsonInclude.Include.NON_NULL)
@RequestMapping(value = "/api")
public class ActController {
    private final static Logger LOGGER = LoggerFactory.getLogger(ActController.class);
    @Autowired
    private ActService actService;

    @RequestMapping(value = "/acts", method = RequestMethod.GET)
    public List<Act> getActs() {
        LOGGER.debug("REST request. Path:/acts  method: GET");
        return actService.getAll();
    }

    @RequestMapping(value = "/acts_by_company", method = RequestMethod.GET)
    public List<Act> getActsByCompany(@RequestParam Long id) {
        LOGGER.debug("REST request. Path:/acts_by_company?id=  method: GET", id);
        List<Act> acts = actService.getByCompany(id);
        acts.stream().forEach((act) -> {
            if (act.getUser() != null) {
                act.setUser(new User() {{
                    setId(act.getUser().getId());
                    setLogin(act.getUser().getLogin());
                }});
            }
            if (act.getWaybill() != null) {
                act.setWaybill(new Waybill() {{
                    setId(act.getWaybill().getId());
                    setNumber(act.getWaybill().getNumber());
                }});
            }
        });
        return acts;
    }


    @RequestMapping(value = "/act/{id}", method = RequestMethod.GET)
    public Act getAct(@PathVariable Long id) {
        LOGGER.debug("REST request. Path:/act/{}  method: GET", id);
        Act act = actService.get(id);
        act.getProductInActs().stream().forEach((productInAct) -> productInAct.setAct(null));
        return act;
    }


    @RequestMapping(value = "/act/{id}", method = RequestMethod.DELETE)
    public void deleteAct(@PathVariable Long id, HttpServletResponse response) {
        LOGGER.debug("REST request. Path:/act/{}  method: DELETE", id);
        actService.delete(id);
        response.addHeader("result", "Act has deleted.");
    }


    @RequestMapping(value = "/acts", method = RequestMethod.DELETE)
    public void deleteActs(@RequestParam(value = "ids") List<Long> actsId, HttpServletResponse response) {
        LOGGER.debug("REST request. Path:/acts?ids={}  method: DELETE Request body {acts}", actsId);
        actService.delete(actsId.toArray(new Long[actsId.size()]));
        response.addHeader("result", "Acts have deleted.");
    }

    @RequestMapping(value = "/act", method = RequestMethod.POST)
    public void saveAct(@RequestBody Act act, HttpServletResponse response) {
        LOGGER.debug("REST request. Path:/act  method: POST Request body {}", act);
        act.setReportDate(new Date());
        Act saveAct = actService.save(act);
        response.addHeader("result", "Act has saved.");
    }

    @ExceptionHandler(ValidationError.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> fieldHasErrors(ValidationError error, HttpServletResponse response) {
        LOGGER.error("fieldHasErrors({})", error.toString());
        response.addHeader("result", "Fields is not valid.");
        return error.getErrors();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void exception(Exception exception, HttpServletResponse response) {
        LOGGER.error("fieldHasErrors({})", exception.getMessage());
        response.addHeader("result", "Server error.");
    }
}

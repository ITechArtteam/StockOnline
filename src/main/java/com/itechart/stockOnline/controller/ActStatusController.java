package com.itechart.stockOnline.controller;

import com.itechart.stockOnline.model.Act;
import com.itechart.stockOnline.model.enums.ActStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ActStatusController {
    private final static Logger LOGGER = LoggerFactory.getLogger(ActStatusController.class);
    @RequestMapping(value = "/act_status", method = RequestMethod.GET)
    public ActStatus[] getActStatus() {
        LOGGER.debug("REST request. Path:/act_status  method: GET");
        return ActStatus.values();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void exception(Exception exception, HttpServletResponse response){
        LOGGER.error("fieldHasErrors({})", exception.getMessage());
        response.addHeader("result", "Server error.");
    }
}

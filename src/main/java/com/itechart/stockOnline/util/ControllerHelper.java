package com.itechart.stockOnline.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;

public class ControllerHelper {
    private static final Logger logger = LoggerFactory.getLogger(ControllerHelper.class);
    public static String convertToUtf(String parameter) {
        try {
            parameter =  new String(parameter.getBytes("ISO-8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            logger.debug("Can't converted param {} to utf.", parameter);
        }
        return parameter;
    }
}

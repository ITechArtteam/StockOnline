package com.itechart.stockOnline.validator;

import java.util.regex.Pattern;

public class ValidatorUtils {

    public static boolean checkRegexp(String regexp, String str){
        return Pattern.compile(regexp, Pattern.UNICODE_CASE | Pattern.CASE_INSENSITIVE).matcher(str).matches();
    }
}

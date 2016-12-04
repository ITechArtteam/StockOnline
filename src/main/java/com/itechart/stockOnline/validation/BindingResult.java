package com.itechart.stockOnline.validation;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.HashMap;
import java.util.Map;

public class BindingResult {
    Map<String, Throwable> map;

    public BindingResult() {
        map = new HashMap();
    }

    public BindingResult addError(String field, Throwable throwable) {
        map.put(field, throwable);
        return this;
    }

    public boolean hasErroe() {
        if (map.size() == 0) {
            return false;
        } else {
            return true;
        }
    }

    public Map<String, Throwable> getMap() {
        return map;
    }

    public Map<String, String> get(){
        Map<String, String> map = new HashMap<>();
        for (String field:this.map.keySet()){
            map.put(field, this.map.get(field).getMessage());
        }
        return map;
    }

    public void setMap(Map<String, Throwable> map) {
        this.map = map;
    }

    public BindingResult putAll(BindingResult bindingResult){
        this.map.putAll(bindingResult.getMap());
        return this;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("map", map)
                .toString();
    }

}
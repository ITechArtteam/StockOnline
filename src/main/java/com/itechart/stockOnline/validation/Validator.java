package com.itechart.stockOnline.validation;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Validator {

    private static volatile Validator instance;

    private Validator() {
    }

    ;

    public static Validator getValidator() {
        Validator localInstance = instance;
        if (localInstance == null) {
            synchronized (Validator.class) {
                localInstance = instance;
                if (localInstance == null) {
                    instance = localInstance = new Validator();
                }
            }
        }
        return localInstance;
    }


    void testNotNull(Field field, Object object, BindingResult bindingResult, Class clazz) throws IllegalAccessException {
        NotNull[] annotationsByType = field.getAnnotationsByType(NotNull.class);
        Arrays.stream(annotationsByType).forEach((annotation) -> {
            try {
                if (field.get(object) == null && annotation.group().equals(clazz)) {
                    String name = annotation.name();
                    if (name.equals("")) {
                        name = field.getName();
                    }
                    bindingResult.addError(name, new NullPointerException(annotation.message()));
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        });
    }


    void testMaxSize(Field field, Object object, BindingResult bindingResult, Class clazz) throws IllegalAccessException {
        MaxSize[] annotationsByType = field.getAnnotationsByType(MaxSize.class);
        Arrays.stream(annotationsByType).forEach((annotation) -> {
            try {
                if (field.get(object) != null && field.getType().isAssignableFrom(String.class) && annotation.group().equals(clazz)) {
                    String string = (String) field.get(object);
                    if (string.length() > annotation.value()) {
                        String name = annotation.name();
                        if (name.equals("")) {
                            name = field.getName();
                        }
                        bindingResult.addError(name, new BigStringException(annotation.message()));
                    }
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        });
    }

    void testMinSize(Field field, Object object, BindingResult bindingResult, Class clazz) throws IllegalAccessException {
        MinSize[] annotationsByType = field.getAnnotationsByType(MinSize.class);
        Arrays.stream(annotationsByType).forEach((annotation) -> {
            try {
                if (field.get(object) != null && field.getType().isAssignableFrom(String.class) && annotation.group().equals(clazz)) {
                    String string = (String) field.get(object);
                    if (string.length() < annotation.value()) {
                        String name = annotation.name();
                        if (name.equals("")) {
                            name = field.getName();
                        }
                        bindingResult.addError(name, new LittleStringException(annotation.message()));
                    }
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        });
    }

    void testEmail(Field field, Object object, BindingResult bindingResult, Class clazz) throws IllegalAccessException {
        Email[] annotationsByType = field.getAnnotationsByType(Email.class);
        Arrays.stream(annotationsByType).forEach((annotation) -> {
            try {
                if (field.get(object) != null && field.getType().isAssignableFrom(String.class) && annotation.group().equals(clazz)) {
                    String string = (String) field.get(object);
                    if (!java.util.regex.Pattern.compile("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$").matcher((String) field.get(object)).matches()) {
                        String name = annotation.name();
                        if (name.equals("")) {
                            name = field.getName();
                        }
                        bindingResult.addError(name, new InvalidEmailException(annotation.message()));
                    }
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        });
    }

    void testPattern(Field field, Object object, BindingResult bindingResult, Class clazz) throws IllegalAccessException {
        Pattern[] annotationsByType = field.getAnnotationsByType(Pattern.class);
        Arrays.stream(annotationsByType).forEach((annotation) -> {
            try {
                if (field.get(object) != null && field.getType().isAssignableFrom(String.class) && annotation.group().equals(clazz)) {
                    String string = (String) field.get(object);
                    if (!java.util.regex.Pattern.compile(annotation.value()).matcher((String) field.get(object)).matches()) {
                        String name = annotation.name();
                        if (name.equals("")) {
                            name = field.getName();
                        }
                        bindingResult.addError(name, new InvalidEmailException(annotation.message()));
                    }
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        });
    }

    void testValidate(Field field, Object object, BindingResult bindingResult, Class clazz) throws IllegalAccessException {
        Validate[] annotationsByType = field.getAnnotationsByType(Validate.class);
        Arrays.stream(annotationsByType).forEach((annotation) -> {
            try {
                if (field.get(object) != null && annotation.group().equals(clazz)) {
                    BindingResult checkBindingResult = check(object, clazz);
                    bindingResult.putAll(checkBindingResult);
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        });
    }
    
    

    public BindingResult check(Object object) {
        return check(object,Default.class);
    }

    public BindingResult check(Object object, Class clazz) {
        BindingResult bindingResult = new BindingResult();
        Arrays.stream(object.getClass().getDeclaredFields()).forEach(field -> {
            field.setAccessible(true);
            try {
                testNotNull(field, object, bindingResult, clazz);
                testMaxSize(field, object, bindingResult, clazz);
                testMinSize(field, object, bindingResult, clazz);
                testEmail(field, object, bindingResult, clazz);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }

        });
        return bindingResult;
    }


    public class BindingResult {
        Map<String, Throwable> map;

        public BindingResult() {
            map = new HashMap();
        }

        BindingResult addError(String field, Throwable throwable) {
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

}
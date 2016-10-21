package com.itechart.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class Persone {
    @Id
    @GeneratedValue
    private Long id;
    private String firstName;

    public Persone(String firstName) {
        this.firstName = firstName;
    }
}

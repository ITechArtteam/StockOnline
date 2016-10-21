package com.itechart.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table
@Data
public class User {
    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)
    @Column(nullable = false, columnDefinition = "INT(11) UNSIGNED")
    private long idUser;

    @Column(nullable = false, length = 30)
    private String firstName;

    @Column(nullable = false)
    private String password;

}

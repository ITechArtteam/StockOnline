package com.itechart.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user")
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

    @Transient
    private String confirmPassword;

    @ManyToMany
    @JoinTable(name = "userRoles", joinColumns = @JoinColumn(name = "idUser"),
            inverseJoinColumns = @JoinColumn(name = "idRole"))
    private Set<Role> roles;
}

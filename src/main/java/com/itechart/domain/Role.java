package com.itechart.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "roles")
@Data
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, columnDefinition = "INT(11) UNSIGNED")
    private Long idRole;

    @Column(nullable = false, length = 30)
    private String name;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users;
}

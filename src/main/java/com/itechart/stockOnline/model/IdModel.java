package com.itechart.stockOnline.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class IdModel {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, columnDefinition = "INT(11) UNSIGNED")
    private Integer id;

    public IdModel() {
    }

    public IdModel(Integer id) {
        this.id = id;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
}

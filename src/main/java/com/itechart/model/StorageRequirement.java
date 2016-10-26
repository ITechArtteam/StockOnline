package com.itechart.model;

import javax.persistence.*;
//import javax.validation.constraints.Size;

import java.util.Set;

@Entity
@Table(name = "storage_requirement")
public class StorageRequirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
//    @Size(max=50, message="Number of letters in type < 50")
    private String type;

    @OneToMany(mappedBy = "storage")
    private Set<Room> rooms;

    @OneToMany(mappedBy = "storage")
    private Set<Product> products;

    @OneToMany(mappedBy = "storage")
    private Set<Transport> transports;

    public StorageRequirement() {
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Set<Room> getRooms() { return rooms; }
    public void setRooms(Set<Room> rooms) { this.rooms = rooms; }

    public Set<Product> getProducts() { return products; }
    public void setProducts(Set<Product> products) { this.products = products; }

    public Set<Transport> getTransports() { return transports; }
    public void setTransports(Set<Transport> transports) { this.transports = transports; }

    @Override
    public String toString() {
        return "StorageRequirement{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", rooms=" + rooms +
                ", products=" + products +
                ", transports=" + transports +
                '}';
    }
}

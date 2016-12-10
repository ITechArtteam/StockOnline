package com.itechart.stockOnline.model;

import org.apache.commons.collections.CollectionUtils;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cost")
    private Double cost;

    @Column(name = "number")
    private String number;

    @ManyToOne
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "storage_requirement_id")
    private StorageRequirement storage;

    @OneToMany(mappedBy = "room", fetch = FetchType.EAGER)
    private Set<Shelf> shelfs;

    public Room() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public Stock getStock() { return stock; }
    public void setStock(Stock stock) { this.stock = stock; }

    public StorageRequirement getStorage() { return storage; }
    public void setStorage(StorageRequirement storageRequirement) { this.storage = storageRequirement; }

    public Set<Shelf> getShelfs() { return shelfs; }
    public void setShelfs(Set<Shelf> shelfs) { this.shelfs = shelfs; }

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id + "}";
    }
}

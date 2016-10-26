package com.itechart.model;

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

    @ManyToOne
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @ManyToOne
    @JoinColumn(name = "storage_requirement_id")
    private StorageRequirement storage;

    @OneToMany(mappedBy = "room")
    private Set<Shelf> shelfs;

    public Room() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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
        return "RoomDao{" +
                "id=" + id +
                ", cost=" + cost +
                ", stock=" + stock +
                ", storageRequirement=" + storage +
                ", shelfs=" + shelfs +
                '}';
    }
}

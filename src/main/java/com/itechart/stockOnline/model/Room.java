package com.itechart.stockOnline.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "cost")
    private Double cost;

    @ManyToOne
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @ManyToOne
    @JoinColumn(name = "storage_requirement_id")
    private StorageRequirement storage;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private Set<Shelf> shelfs;

    public Room() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

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

package com.itechart.stockOnline.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "shelf")
public class Shelf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "number")
    private String number;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "is_free")
    private Boolean isFree;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @OneToMany(mappedBy = "shelf")
    private Set<ProductOnShelf> productOnShelfs;

    public Shelf() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public Boolean getFree() { return isFree; }
    public void setFree(Boolean free) { isFree = free; }

    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }

    public Set<ProductOnShelf> getProductOnShelfs() { return productOnShelfs; }
    public void setProductOnShelfs(Set<ProductOnShelf> productOnShelfs) { this.productOnShelfs = productOnShelfs; }

    @Override
    public String toString() {
        return "Shelf{" +
                "id=" + id +
                "number=" + number +
                ", capacity=" + capacity +
                ", isFree=" + isFree +
                ", room=" + room +
//                ", productOnShelfs=" + productOnShelfs +
                '}';
    }
}

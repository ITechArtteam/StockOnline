package com.itechart.stockOnline.model;

import com.itechart.stockOnline.model.enums.TransportType;

import javax.persistence.*;
//import javax.validation.constraints.Size;

import java.util.Set;

@Entity
@Table(name = "transport")
public class Transport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "number")
    private String number;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private TransportType type;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "storage_requirement_id")
    private StorageRequirement storage;

    @OneToMany(mappedBy = "transport")
    private Set<Waybill> waybills;

    public Transport() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public Driver getDriver() { return driver; }
    public void setDriver(Driver driver) { this.driver = driver; }

    public StorageRequirement getStorage() { return storage; }
    public void setStorage(StorageRequirement storageRequirement) { this.storage = storageRequirement; }

    public Set<Waybill> getWaybills() { return waybills; }
    public void setWaybills(Set<Waybill> waybills) { this.waybills = waybills; }

    public TransportType getType() { return type; }
    public void setType(TransportType type) { this.type = type; }

    @Override
    public String toString() {
        return "Transport{" +
                "id=" + id +
                ", number='" + number + '\'' +
                ", type=" + type +
                ", driver=" + driver +
                ", storage=" + storage +
                ", waybills=" + waybills +
                '}';
    }
}

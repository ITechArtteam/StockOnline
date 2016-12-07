package com.itechart.stockOnline.model;

import com.itechart.stockOnline.model.enums.ProductStatus;
import com.itechart.stockOnline.model.enums.ProductUnit;

import javax.persistence.*;
//import javax.validation.constraints.Size;

import java.util.Set;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "cost")
    private Double cost;

    @Column(name = "count")
    private Integer count;

    @Column(name = "expiry_date")
    private Short expiryDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @Column(name = "unit")
    @Enumerated(EnumType.STRING)
    private ProductUnit unit;

    @ManyToOne
    @JoinColumn(name = "storage_requirement_id")
    private StorageRequirement storage;

    @OneToMany(mappedBy = "product")
    private Set<ProductOnShelf> productOnShelfs;

    @OneToMany(mappedBy = "product")
    private Set<ProductInWaybill> productInWaybills;

    @OneToMany(mappedBy = "product")
    private Set<ProductInAct> productInActs;

    public Product() {    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public Short getExpiryDate() { return expiryDate; }
    public void setExpiryDate(Short expiryDate) { this.expiryDate = expiryDate; }

    public ProductStatus getStatus() { return status; }
    public void setStatus(ProductStatus status) { this.status = status; }

    public StorageRequirement getStorage() { return storage; }
    public void setStorage(StorageRequirement storageRequirement) { this.storage = storageRequirement; }

    public Set<ProductOnShelf> getProductOnShelfs() { return productOnShelfs; }
    public void setProductOnShelfs(Set<ProductOnShelf> productOnShelfs) { this.productOnShelfs = productOnShelfs; }

    public Set<ProductInWaybill> getProductInWaybills() { return productInWaybills; }
    public void setProductInWaybills(Set<ProductInWaybill> productInWaybills) { this.productInWaybills = productInWaybills; }

    public Set<ProductInAct> getProductInActs() { return productInActs; }
    public void setProductInActs(Set<ProductInAct> productInActs) { this.productInActs = productInActs; }

    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }

    public ProductUnit getUnit() { return unit; }
    public void setUnit(ProductUnit unit) { this.unit = unit; }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cost=" + cost +
                ", count=" + count +
                ", expiryDate=" + expiryDate +
                ", status=" + status +
                ", unit=" + unit +
                ", storage=" + storage +
                ", productOnShelfs=" + productOnShelfs +
                ", productInWaybills=" + productInWaybills +
                '}';
    }
}

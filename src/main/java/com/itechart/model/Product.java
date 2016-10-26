package com.itechart.model;

import com.itechart.model.enums.ProductStatus;

import javax.persistence.*;
//import javax.validation.constraints.Size;

import java.util.Set;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
//    @Size(max=50, message="Number of letters in name < 50")
    private String name;

    @Column(name = "unit")
//    @Size(max=10, message="Number of letters in name < 10")
    private String unit;

    @Column(name = "cost")
    private Double cost;

    @Column(name = "expiry_date")
    private Short expiryDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @ManyToOne
    @JoinColumn(name = "storage_requirement_id")
    private StorageRequirement storage;

    @OneToMany(mappedBy = "product")
    private Set<ProductOnShelf> productOnShelfs;

    @OneToMany(mappedBy = "product")
    private Set<Act> acts;

    @OneToMany(mappedBy = "product")
    private Set<ProductInWaybill> productInWaybills;

    public Product() {    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

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

    public Set<Act> getActs() { return acts; }
    public void setActs(Set<Act> acts) { this.acts = acts; }

    public Set<ProductInWaybill> getProductInWaybills() { return productInWaybills; }
    public void setProductInWaybills(Set<ProductInWaybill> productInWaybills) { this.productInWaybills = productInWaybills; }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", unit='" + unit + '\'' +
                ", cost=" + cost +
                ", expiryDate=" + expiryDate +
                ", status=" + status +
                ", storageRequirement=" + storage +
                ", productOnShelfs=" + productOnShelfs +
                ", acts=" + acts +
                ", productInWaybills=" + productInWaybills +
                '}';
    }
}

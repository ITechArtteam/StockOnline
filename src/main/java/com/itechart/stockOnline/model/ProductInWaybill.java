package com.itechart.stockOnline.model;

import javax.persistence.*;

@Entity
@Table(name = "product_in_waybill")
public class ProductInWaybill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "count")
    private Integer count;

    @ManyToOne
    @JoinColumn(name = "waybill_id")
    private Waybill waybill;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public ProductInWaybill() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }

    public Waybill getWaybill() { return waybill; }
    public void setWaybill(Waybill waybill) { this.waybill = waybill; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    @Override
    public String toString() {
        return "ProductInWaybill{" +
                "id=" + id +
                ", count=" + count +
                ", waybill=" + waybill +
                ", product=" + product +
                '}';
    }
}

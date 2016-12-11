package com.itechart.stockOnline.model;


import com.itechart.stockOnline.model.enums.ActStatus;

import javax.persistence.*;

@Entity
@Table(name = "product_in_act")
public class ProductInAct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "act_id")
    private Act act;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "count")
    private Integer count;

    @Column(name = "cost")
    private Double cost;

    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private ActStatus status;

    public ProductInAct() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Act getAct() { return act; }
    public void setAct(Act act) { this.act = act; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }

    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public ActStatus getStatus() { return status; }
    public void setStatus(ActStatus status) { this.status = status; }

    @Override
    public String toString() {
        return "ProductInAct{" +
                "id=" + id +
                '}';
    }
}

package com.itechart.model;

import com.itechart.model.enums.ActStatus;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "act")
public class Act {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "report_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date reportDate;

    @Column(name = "count")
    private Integer count;

    @Column(name = "cost")
    private Double cost;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ActStatus status;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "responsible_person_id")
    private User user;

    public Act() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Date getReportDate() { return reportDate; }
    public void setReportDate(Date reportDate) { this.reportDate = reportDate; }

    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }

    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public ActStatus getStatus() { return status; }
    public void setStatus(ActStatus status) { this.status = status; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    @Override
    public String toString() {
        return "Act{" +
                "id=" + id +
                ", reportDate=" + reportDate +
                ", count=" + count +
                ", cost=" + cost +
                ", status=" + status +
                ", product=" + product +
                ", user=" + user +
                '}';
    }
}

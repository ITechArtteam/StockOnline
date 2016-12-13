package com.itechart.stockOnline.model;

import com.itechart.stockOnline.model.enums.ActStatus;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "act")
public class Act {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "report_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date reportDate;

    @ManyToOne
    @JoinColumn(name = "responsible_person_id")
    private User user;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "waybill_id")
    private Waybill waybill;

    @OneToMany(mappedBy = "act", cascade = CascadeType.ALL,  fetch = FetchType.LAZY)
    private Set<ProductInAct> productInActs;

    public Act() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Date getReportDate() { return reportDate; }
    public void setReportDate(Date reportDate) { this.reportDate = reportDate; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Set<ProductInAct> getProductInActs() { return productInActs; }
    public void setProductInActs(Set<ProductInAct> productInActs) { this.productInActs = productInActs; }

    public Waybill getWaybill() { return waybill; }
    public void setWaybill(Waybill waybill) { this.waybill = waybill; }

    @Override
    public String toString() {
        return "Act{" +
                "id=" + id + "}";
    }
}

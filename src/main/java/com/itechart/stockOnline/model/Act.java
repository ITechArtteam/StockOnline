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

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ActStatus status;

    @ManyToOne
    @JoinColumn(name = "responsible_person_id")
    private User user;

    @OneToMany(mappedBy = "act", cascade = CascadeType.PERSIST,  fetch = FetchType.EAGER)
    private Set<ProductInAct> productInActs;

    public Act() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Date getReportDate() { return reportDate; }
    public void setReportDate(Date reportDate) { this.reportDate = reportDate; }

    public ActStatus getStatus() { return status; }
    public void setStatus(ActStatus status) { this.status = status; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Set<ProductInAct> getProductInActs() { return productInActs; }
    public void setProductInActs(Set<ProductInAct> productInActs) { this.productInActs = productInActs; }

    @Override
    public String toString() {
        return "Act{" +
                "id=" + id + "}";
    }
}

package com.itechart.stockOnline.model;

import com.itechart.stockOnline.model.enums.WaybillStatus;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "waybill")
public class Waybill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "registration_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date registrationDate;

    @Column(name = "check_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date checkDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private WaybillStatus status;

    @OneToMany(mappedBy = "waybill", fetch = FetchType.EAGER)
    private Set<ProductInWaybill> productInWaybills;

    @OneToMany(mappedBy = "waybill")
    private Set<Act> actInWaybills;

    @ManyToOne
    @JoinColumn(name = "transport_id")
    private Transport transport;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private ClientCompany sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private ClientCompany receiver;

    @ManyToOne
    @JoinColumn(name = "responsible_person_id")
    private User responsiblePerson;

    @ManyToOne
    @JoinColumn(name = "checked_by")
    private User checkedBy;

    @ManyToOne
    @JoinColumn(name = "registered_by")
    private User registeredBy;

    @Column(name = "number")
    private String number;

    @Column(name = "issuance_date")
    @Temporal(TemporalType.DATE)
    private Date issuanceDate;

    @Column(name = "description")
    private String description;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Date getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(Date registrationDate) { this.registrationDate = registrationDate; }

    public Date getCheckDate() { return checkDate; }
    public void setCheckDate(Date checkDate) { this.checkDate = checkDate; }

    public WaybillStatus getStatus() { return status; }
    public void setStatus(WaybillStatus status) { this.status = status; }

    public Set<ProductInWaybill> getProductInWaybills() { return productInWaybills; }
    public void setProductInWaybills(Set<ProductInWaybill> productInWaybills) { this.productInWaybills = productInWaybills; }

    public Transport getTransport() { return transport; }
    public void setTransport(Transport transport) { this.transport = transport; }

    public ClientCompany getSender() { return sender; }
    public void setSender(ClientCompany sender) { this.sender = sender; }

    public ClientCompany getReceiver() { return receiver; }
    public void setReceiver(ClientCompany receiver) { this.receiver = receiver; }

    public User getResponsiblePerson() { return responsiblePerson; }
    public void setResponsiblePerson(User responsiblePerson) { this.responsiblePerson = responsiblePerson; }

    public User getCheckedBy() { return checkedBy; }
    public void setCheckedBy(User checkedBy) { this.checkedBy = checkedBy; }

    public User getRegisteredBy() { return registeredBy; }
    public void setRegisteredBy(User registeredBy) { this.registeredBy = registeredBy; }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Date getIssuanceDate() {
        return issuanceDate;
    }

    public void setIssuanceDate(Date issuanceDate) {
        this.issuanceDate = issuanceDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Act> getActInWaybills() { return actInWaybills; }
    public void setActInWaybills(Set<Act> actInWaybills) { this.actInWaybills = actInWaybills; }

    @Override
    public String toString() {
        return "Waybill{" +
                "id=" + id + "}";
    }
}

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

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private WaybillStatus status;

    @OneToMany(mappedBy = "waybill")
    private Set<ProductInWaybill> productInWaybills;

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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Date getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(Date registrationDate) { this.registrationDate = registrationDate; }

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

    @Override
    public String toString() {
        return "Waybill{" +
                "id=" + id +
                ", registrationDate=" + registrationDate +
                ", status=" + status +
                ", productInWaybills=" + productInWaybills +
                ", transport=" + transport +
                ", sender=" + sender +
                ", receiver=" + receiver +
                ", responsiblePerson=" + responsiblePerson +
                ", checkedBy=" + checkedBy +
                ", registeredBy=" + registeredBy +
                '}';
    }
}
package com.itechart.stockOnline.model;

import javax.persistence.*;
import java.util.Set;



@Entity
@Table(name = "client_company")
public class ClientCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
//    @Size(max=50, message="Number of letters in name < 50")
    private String name;

    @ManyToOne
    @JoinColumn(name = "boss")
    private User boss;

    @ManyToOne
    @JoinColumn(name = "admin")
    private User admin;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToMany(mappedBy="sender")
    private Set<Waybill> senderCompanies;

    @OneToMany(mappedBy="receiver")
    private Set<Waybill> receiverCompanies;

    public ClientCompany() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    public Set<Waybill> getSenderCompanies() { return senderCompanies; }
    public void setSenderCompanies(Set<Waybill> senderCompanies) { this.senderCompanies = senderCompanies; }

    public Set<Waybill> getReceiverCompanies() { return receiverCompanies; }
    public void setReceiverCompanies(Set<Waybill> receiverCompanies) { this.receiverCompanies = receiverCompanies; }

    public User getBoss() { return boss; }
    public void setBoss(User boss) { this.boss = boss; }

    public User getAdmin() {
        return admin;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }

    @Override
    public String toString() {
        return "ClientCompany{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", boss=" + boss +
                ", admin=" + admin +
                ", address=" + address +
                ", senderCompanies=" + senderCompanies +
                ", receiverCompanies=" + receiverCompanies +
                '}';
    }
}

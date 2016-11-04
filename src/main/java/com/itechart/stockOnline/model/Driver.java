package com.itechart.stockOnline.model;

import javax.persistence.*;
//import javax.validation.constraints.Size;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "driver")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "passport_number")
//    @Size(max=30, message="Number of letters in passport number < 30")
    private String passportNumber;

    @Column(name = "passport_issued_by")
//    @Size(max=30, message="Number of letters in passport issued by < 30")
    private String passportIssuedBy;

    @Column(name = "passport_issued_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date passportIssuedDate;

    @Column(name = "first_name")
//    @Size(max=30, message="Number of letters in first name < 30")
    private String firstName;

    @Column(name = "last_name")
//    @Size(max=30, message="Number of letters in last name < 30")
    private String lastName;

    @Column(name = "patronymic")
//    @Size(max=30, message="Number of letters in patronymic < 30")
    private String patronymic;

    @Column(name = "birth_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date birthDate;

    @ManyToOne
    @JoinColumn(name = "transfer_company_id")
    private TransferCompany company;

    @OneToMany(mappedBy = "driver")
    private Set<Transport> transports;

    public Driver() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getPassportNumber() { return passportNumber; }
    public void setPassportNumber(String passportNumber) { this.passportNumber = passportNumber; }

    public String getPassportIssuedBy() { return passportIssuedBy; }
    public void setPassportIssuedBy(String passportIssuedBy) { this.passportIssuedBy = passportIssuedBy; }

    public Date getPassportIssuedDate() { return passportIssuedDate; }
    public void setPassportIssuedDate(Date passportIssuedDate) { this.passportIssuedDate = passportIssuedDate; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPatronymic() { return patronymic; }
    public void setPatronymic(String patronymic) { this.patronymic = patronymic; }

    public Date getBirthDate() { return birthDate; }
    public void setBirthDate(Date birthDate) { this.birthDate = birthDate; }

    public TransferCompany getCompany() { return company; }
    public void setCompany(TransferCompany transferCompany) { this.company = transferCompany; }

    public Set<Transport> getTransports() { return transports; }
    public void setTransports(Set<Transport> transports) { this.transports = transports; }

    @Override
    public String toString() {
        return "Driver{" +
                "id=" + id +
                ", passportNumber='" + passportNumber + '\'' +
                ", passportIssuedBy='" + passportIssuedBy + '\'' +
                ", passportIssuedDate=" + passportIssuedDate +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", patronymic='" + patronymic + '\'' +
                ", birthDate=" + birthDate +
                ", transferComany=" + company +
                ", transports=" + transports +
                '}';
    }
}
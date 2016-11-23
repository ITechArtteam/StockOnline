package com.itechart.stockOnline.model;

import javax.persistence.*;
import java.util.Set;
import java.sql.Date;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String login;

    @Column(nullable = false)
    private String password;

    @Column(length = 20)
    private String name;


    @Column(length = 20)
    private String surname;

    @Column(length = 20)
    private String patronymic;

    private Date birthday;

    @Column(length = 50, nullable = false)
    private String email;


    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "company")
    private StockOwnerCompany stockOwnerCompany;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address", nullable = false)
    private Address address;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public User(){
        address = new Address();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public StockOwnerCompany getStockOwnerCompany() {
        return stockOwnerCompany;
    }

    public void setStockOwnerCompany(StockOwnerCompany stockOwnerCompany) {
        this.stockOwnerCompany = stockOwnerCompany;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", surname='" + surname + '\'' +
                ", patronymic='" + patronymic + '\'' +
                ", birthday=" + birthday +
                ", email='" + email + '\'' +
                ", login='" + login + '\'' +
                ", stockOwnerCompany=" + stockOwnerCompany +
                ", address=" + address +
                ", roles=" + roles +
                '}';
    }
}

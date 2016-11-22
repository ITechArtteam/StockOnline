package com.itechart.stockOnline.model;


import com.itechart.stockOnline.validation.*;
import com.itechart.stockOnline.validator.Worker;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Pattern(value = "^[a-z_а-я]*$", group = User.class, message = "Логин должен содержать только буквы и/или символы подчеркивания.")
    @NotNull(group = User.class, message = "Логин должен быть заполнен обязательно.")
    @MinSize(value = 3 , group = User.class, message = "Длина логина должна быть от 3 символов")
    @NotNull(group = Worker.class, message = "Логин должен быть заполнен обязательно.")
    @Pattern(value = "^[a-z_а-я]*$", group = Worker.class, message = "Логин должен содержать только буквы и/или символы подчеркивания.")
    @MinSize(value = 3 , group = Worker.class, message = "Длина логина должна быть от 3 символов")
    @MaxSize(value = 20 , group = Worker.class, message = "Длина логина не должна превышать 20 символов.")
    @Column(length = 20, nullable = false)
    private String login;
    @NotNull(group = User.class, message = "Пароль должен быть заполнен обязательно.")
    @MinSize(value = 3 , group = User.class, message = "Длина пароля должна быть от 3 символов")
    @NotNull(group = Worker.class, message = "Пароль должен быть заполнен обязательно.")
    @MaxSize(value = 20 , group = Worker.class, message = "Длина пароля должна быть от 3 до 20 символов")
    @MinSize(value = 3 , group = Worker.class, message = "Длина пароля должна быть от 3 до 20 символов")
    @Column(nullable = false)
    private String password;
    @NotNull(group = Worker.class, message = "Имя должно быть заполненно обязательно.")
    @MaxSize(value = 20 , group = Worker.class, message = "Длина имени должна быть до 20 символов.")
    @Column(length = 20)
    private String name;
    @MaxSize(value = 20 , group = Worker.class, message = "Длина фамилии должна быть до 20 символов.")
    @Column(length = 20)
    private String surname;
    @MaxSize(value = 20 , group = Worker.class, message = "Длина отчества должна быть до 20 символов.")
    @Column(length = 20)
    private String patronymic;
    private Date birthday;
    @NotNull(group = Worker.class, message = "Электронная почта должна быть заполнена.")
    @MaxSize(value = 50 , group = Worker.class, message = "Длина электронной почты должна быть меньше 50 символов.")
    @Email(group = Worker.class, message = "Введенная электронная почта невалидна.")
    @Column(length = 50, nullable = false)
    private String email;
    @MaxSize(value = 50 , message = "test должен быть меньше 50")
    public Integer test;

    @ManyToOne
    @JoinColumn(name = "company", nullable = true)
    private StockOwnerCompany stockOwnerCompany;

    @ManyToOne
    @JoinColumn(name = "address", nullable = false)
    private Address address;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<Role> roles;

    public User() {
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

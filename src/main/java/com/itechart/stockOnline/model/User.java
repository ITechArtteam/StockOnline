package com.itechart.stockOnline.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "boss")
    private Set<ClientCompany> bosses;

    @OneToMany(mappedBy = "admin")
    private Set<ClientCompany> admins;

    @ManyToMany
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public Set<ClientCompany> getBosses() { return bosses; }

    public void setBosses(Set<ClientCompany> bosses) { this.bosses = bosses; }

    public Set<ClientCompany> getAdmins() {
        return admins;
    }

    public void setAdmins(Set<ClientCompany> admins) {
        this.admins = admins;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", bosses=" + bosses +
                ", admins=" + admins +
                ", roles=" + roles +
                '}';
    }
}
